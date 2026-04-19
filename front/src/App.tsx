import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { MegaSenaProvider, useMegaSena } from './context/MegaSenaContext';
import { ConcursoCard } from './components/ConcursoCard';

const GlobalStyle = createGlobalStyle`
  body { background: #e8f5e9; font-family: sans-serif; margin: 0; padding: 0; }
`;

const Container = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 0 20px;
`;

const Header = styled.h1`
  color: #1a7a1a;
  text-align: center;
`;

const BuscaContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin: 20px 0;
`;

const Input = styled.input`
  padding: 10px;
  border: 2px solid #1a7a1a;
  border-radius: 8px;
  font-size: 16px;
  width: 160px;
`;

const Botao = styled.button`
  padding: 10px 20px;
  background: #1a7a1a;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  &:hover { background: #145214; }
`;

const Busca = () => {
  const [numero, setNumero] = useState('');
  const { buscarConcurso } = useMegaSena();

  const handleBuscar = () => {
    if (numero) buscarConcurso(Number(numero));
  };

  return (
    <BuscaContainer>
      <Input
        type="number"
        placeholder="Nº do concurso"
        value={numero}
        onChange={e => setNumero(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleBuscar()}
      />
      <Botao onClick={handleBuscar}>Buscar</Botao>
    </BuscaContainer>
  );
};

function App() {
  return (
    <MegaSenaProvider>
      <GlobalStyle />
      <Container>
        <Header>🍀 Mega-Sena</Header>
        <Busca />
        <ConcursoCard />
      </Container>
    </MegaSenaProvider>
  );
}

export default App;