/**
 * Nome do arquivo: App.jsx
 * Data de criação: 11/11/2024
 * Autor: [João Eric]
 * Matrícula: [01711035]
 *
 * Descrição:
 * Componente principal que busca a imagem astronômica do dia a partir da API
 * e permite que o usuário selecione uma data para ver a imagem daquele dia.
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [data, setData] = useState(null); // Armazena os dados da imagem
  const [date, setDate] = useState('');   // Armazena a data escolhida
  const [loading, setLoading] = useState(true);  // Estado de carregamento
  const [error, setError] = useState(null);  // Estado de erro

  const API_KEY = '30k7dqJXfJwvrB1YhifQRxAnqALXnwzi4kbw6tIr';  // Chave API

  // buscando os dados da API
  const fetchData = async (date = '') => {
    setLoading(true);
    setError(null);

    try {
      // URL da API
      const url = date
        ? `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`  // caso tenha data
        : `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;  // Imagem do dia sem data

      const response = await axios.get(url); // Fazendo a requisição da API

      if (response.data && response.data.title && response.data.url && response.data.explanation) {
        setData(response.data);  // Armazena os dados recebidos da API
      } else {
        throw new Error('Dados da API não estão no formato esperado');
      }
    } catch (err) {
      setError('Erro ao carregar a imagem');
    } finally {
      setLoading(false);  // Finaliza o carregamento
    }
  };

  // Carregar os dados assim que o componente for montado
  useEffect(() => {
    fetchData();
  }, []);

  // Função que lida com a mudança da data
  const handleDateChange = (event) => {
    setDate(event.target.value);  // Atualiza a dat
  };

  // Função para buscar a imagem de uma data especifica
  const handleFetchByDate = () => {
    if (date) {
      fetchData(date);  // Busca a imagem para a data selecionada
    }
  };

  // Exibição de estado de carregamento ou erro
  if (loading) {
    return <div>Carregando imagem...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="App">
      <h2>Imagem Astronômica do Dia</h2>
      <div>
        <input
          type="date"
          value={date}
          onChange={handleDateChange}  // Atualiza a data quando o usuário escolhe
        />
        <button onClick={handleFetchByDate}>
          Pesquisar
        </button>
      </div>
      {data && (
         <div className="image-container">
         <div className="image-side">
           <img
             src={data.url}
             alt={data.title}
             style={{ width: '100%', maxHeight: '600px', objectFit: 'cover' }} // Ajuste da imagem
           />
         </div>
         <div className="description-side">
           <h3>{data.title}</h3>  {/* Título da imagem */}
           <p>{data.explanation}</p>  {/* Descrição da imagem */}
         </div>
       </div>
      )}
    </div>
  );
}

export default App;
