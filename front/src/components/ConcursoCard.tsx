import styled from 'styled-components';
import { useMegaSena } from '../context/MegaSenaContext';

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  max-width: 500px;
  margin: 20px auto;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;

const Titulo = styled.h2`
  color: #1a7a1a;
  text-align: center;
`;

const BolasContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin: 20px 0;
`;

const Bola = styled.span`
  background: #1a7a1a;
  color: #fff;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
`;

const Info = styled.p`
  color: #444;
  text-align: center;
  margin: 4px 0;
`;

const Erro = styled.p`
  color: red;
  text-align: center;
  font-weight: bold;
`;

export const ConcursoCard = () => {
  const { concurso, mensagemErro } = useMegaSena();

  if (mensagemErro) return <Erro>{mensagemErro}</Erro>;
  if (!concurso) return <Info>Carregando...</Info>;

  const bolas = [concurso.bola1, concurso.bola2, concurso.bola3,
                 concurso.bola4, concurso.bola5, concurso.bola6];

  return (
    <Card>
      <Titulo>Concurso {concurso.concurso}</Titulo>
      <Info>{new Date(concurso.data_do_sorteio).toLocaleDateString('pt-BR')}</Info>
      <BolasContainer>
        {bolas.map((b, i) => <Bola key={i}>{b}</Bola>)}
      </BolasContainer>
      <Info>Ganhadores: {concurso.ganhadores_6_acertos}</Info>
      <Info>Prêmio: R$ {Number(concurso.rateio_6_acertos).toLocaleString('pt-BR')}</Info>
      <Info>Acumulado: R$ {Number(concurso.acumulado_6_acertos).toLocaleString('pt-BR')}</Info>
    </Card>
  );
};