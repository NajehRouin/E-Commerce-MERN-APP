
import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Api from "../common";

function ProfitChart() {
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        try {
          const response =  await fetch(Api.calculateProfits.url, {
            method: Api.calculateProfits.method,
            credentials: "include",
          });// Update this URL with your actual endpoint

          const dataResponse = await response.json();

          if (dataResponse.success) {
            const formattedData = dataResponse?.data?.map((item) => ({
                _id: item._id, // NumberOrder
                total: item.total, 
            }));
    
            setData(formattedData);
          } else {
            console.error(dataResponse.message);
          }
          

         
        } catch (error) {
          console.error("Error fetching orders data:", error);
        }
      };

      useEffect(()=>{
        fetchOrders()

      },[])

      return (
        <div className=" flex flex-col items-center p-6 bg-white rounded-xl shadow-md space-y-4 w-full  sm:w-[200%] lg:w-[200%]">
        <div className="text-lg font-medium text-black">Profit Grouped by Month</div>
        <div style={{ width: "100%", height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" label={{ value: "Month", position: "insideBottomRight", offset: -3 }} />
              <YAxis label={{ value: "Total", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
  );
}

export default ProfitChart