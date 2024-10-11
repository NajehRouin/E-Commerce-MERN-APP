// ProductChart.js
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import Api from '../common';

const ProductChart = () => {
  const svgRef = useRef();
  const [data, setData] = useState([]);
  const tooltipRef = useRef(null); // Référence au tooltip


  const fetchTotalsByMonth = async () => {
    const fetchData = await fetch(Api.calculateTotalByMont.url, {
      method: Api.calculateTotalByMont.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      const formattedData = dataResponse?.data?.map((item) => ({
        name: item._id, // mm/yyyy
        value: item.totalPrice,
      }));

      setData(formattedData);
    }

    if (dataResponse.error) {
  console.log(dataResponse.message);
    }
  };


  // Fonction pour appeler l'API et récupérer les données
  useEffect(() => {
    fetchTotalsByMonth()
  }, []);

  // Utiliser D3 pour afficher le graphique
  useEffect(() => {
    if (data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 250;
    const height = 250;
    const margin = { top: 20, right: 30, bottom: 30, left: 45 };

    svg.attr('width', width).attr('height', height);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.5);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .range([height - margin.bottom, margin.top]);

    svg
      .append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y));

    const tooltip = d3.select(tooltipRef.current);

    svg
      .append('g')
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.name))
      .attr('y', (d) => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - margin.bottom - y(d.value))
      .attr('fill', '#DC143C') // Couleur des barres
      .on('mouseover', (event, d) => {
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip.html(`Total: ${d.value}`)
          .style('left', `${event.pageX + 5}px`)
          .style('top', `${event.pageY - 28}px`)
      })
      .on('mouseout', () => {
        tooltip.transition().duration(500).style('opacity', 0);
      });
  }, [data]);

  return (
    <>
      <svg ref={svgRef}></svg>
      <div
        ref={tooltipRef}
        style={{
          position: 'absolute',
          textAlign: 'center',
          width: '100px',
          padding: '4px',
          background: 'lightsteelblue',
          border: '0px',
          borderRadius: '8px',
          pointerEvents: 'none',
          opacity: 0 // Masquer le tooltip par défaut
        }}
      ></div>
    </>
  );
};

export default ProductChart;
