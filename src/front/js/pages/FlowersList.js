import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const FlowersList = () => {
  const [data, setData] = useState([]);

  const fetchFlowersPage = async (page, accData = []) => {
    try {
      const response = await fetch(
        `https://api.otreeba.com/v1/flowers?page=${page}&count=50&sort=createdAt`
      );
      const responseData = await response.json();

      if (responseData.data.length > 0) {
        const combinedData = [...accData, ...responseData.data];
        setData(combinedData);
        // Llamada recursiva para obtener datos de la siguiente página
        fetchFlowersPage(page + 1, combinedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Inicia la carga de datos con la página 1
    fetchFlowersPage(1);
  }, []);

  return (
    <>
      <h1>Lista de Flores</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>OCPC</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((flowerData, index) => (
              <tr key={index}>
                <td>{flowerData.name}</td>
                <td>{flowerData.ocpc}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">Cargando...</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default FlowersList;


