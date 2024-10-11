import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import Api from '../common';

const OrderChart = () => {
  const svgRef = useRef();
  const [data, setData] = useState([]);
  const tooltipRef = useRef(null); // Référence au tooltip

  const fetchOrdersByMonth = async () => {
    try {
      const response = await fetch(Api.ordersByMonth.url, {
        method: Api.ordersByMonth.method,
        credentials: "include",
      });

      const dataResponse = await response.json();

      if (dataResponse.success) {
        const formattedData = dataResponse?.data?.map((item) => ({
          name: item._id, // mm/yyyy
          value: item.count,
        }));

        setData(formattedData);
      } else {
        console.error(dataResponse.message);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes:', error);
    }
  };

  useEffect(() => {
    fetchOrdersByMonth();
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = window.innerWidth < 600 ? window.innerWidth * 0.9 : 250; // 90% de la largeur de l'écran pour petits écrans
    const height = 250;
    const margin = {
      top: height * 0.1,   // 10% de la hauteur
      right: width * 0.1,  // 10% de la largeur
      bottom: height * 0.2, // 20% de la hauteur
      left: width * 0.1,   // 10% de la largeur
    };

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
        tooltip.html(`Orders: ${d.value}`)
          .style('left', `${event.pageX + 5}px`)
          .style('top', `${event.pageY - 28}px`);
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

export default OrderChart;
