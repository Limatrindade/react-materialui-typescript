import { useNavigate, useParams } from 'react-router-dom';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { FerramentasDeDetalhe } from '../../shared/components';
import { useEffect, useState } from 'react';
import { CidadesService } from '../../shared/services/api/cidades/CidadesService';
import { LinearProgress, Box, Paper, Grid, Typography } from '@mui/material';
import { VTextField, VForm, useVForm, IVFormErrors } from '../../shared/forms';
import * as yup from 'yup';

interface IFormData {
  nome: string,
}
const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
  nome: yup.string().required().min(3),
});

export const DetalheDeCidades: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();
  const { formRef, save, saveAndClose, isSaveAndClose }= useVForm();

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);  
      CidadesService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);  
          if (result instanceof Error) {
            alert(result.message);
            navigate('/Cidades');
          } else {
            setNome(result.nome);
            //console.log(result);

            formRef.current?.setData(result);
          }
        });
    }  else {
      formRef.current?.setData({
        nome: '',
      });
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {
    // console.log(dados);

    formValidationSchema.
      validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);

        if (id === 'nova') {
          CidadesService.create(dadosValidados)
            .then((result) => {
              setIsLoading(false);
              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndClose()) {
                  navigate('/cidades');
                } else {
                  navigate(`/cidades/detalhe/${result}`);
                }
              }
            });
        } else {
          CidadesService.updateById(Number(id), { id: Number(id), ...dadosValidados})
            .then((result) => {
              setIsLoading(false);
              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndClose()) {
                  navigate('/cidades');
                }
              }
            });
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {};

        errors.inner.forEach(error => {
          if (!error.path) return;

          validationErrors[error.path] = error.message;
        });
        
        console.log(validationErrors);
        formRef.current?.setErrors(validationErrors);
      });

    
  };

  const handleDelete = (id: number) => {
    if(confirm('Realmente deseja apagar?')) {
      CidadesService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert('Registro apagado com sucesso!');
            navigate('/cidades');
          }
        });
    }
  };

  return (
    <LayoutBaseDePagina
      titulo={id === 'nova' ? 'Nova Cidade' : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo='Nova'
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== 'nova'}
          mostrarBotaoApagar={id !== 'nova'}
          
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => navigate('/Cidades/detalhe/nova')}
          aoClicarEmSalvar={save}
          aoClicarEmVoltar={() => navigate('/Cidades')}
          aoClicarEmSalvarEFechar={saveAndClose}
        />
      }
    >
      <VForm ref={formRef} onSubmit={handleSave}>
        <Box margin={1} display="flex" flexDirection="column" component={Paper} variant='outlined'>
        
          <Grid container direction="column" padding={2} spacing={2}>

            {isLoading &&(
              <LinearProgress variant='indeterminate' />
            )} 

            <Grid item>
              <Typography variant='h6' >Geral</Typography>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField label='Nome' name='nome' fullWidth disabled={isLoading} onChange={e => setNome(e.target.value)}/>
              </Grid>
            </Grid>

          </Grid>

        </Box>
      </VForm>

    </LayoutBaseDePagina>
    
  );
};
