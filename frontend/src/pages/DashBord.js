import React, { useEffect, useState } from "react";
import OrderChart  from "../components/OrderChart ";
import ProductChart from "../components/ProductChart";
import Api from "../common";
import { toast } from "react-toastify";
import Card from "../components/Card";
import ProfitChart from "../components/ProfitChart";

function DashBord() {
 

  

  const [userByMonth, SetUserByMonth] = useState(0);
  const [allUsers, SetAllusers] = useState(0);
  const [OrderByCurrentMonth, setOrderbyCurrentMonth] = useState([]);

  const [allOrder, SetAllOrder] = useState(0);

  const [orderReceivedMonthCurrent, SetOrderReceivedMonthCurrent] = useState(0);
  const [orderReceived, SetOrderReceived] = useState(0);

  const [orderReturn, SetOrderReturn] = useState(0);
  const [orderReturnMonthCurrent, SetOrderReturnMonthCurrent] = useState(0);

  const [productsReceivedMonthCurrent, SetProductsReceivedMonthCurrent] =
    useState(0);
  const [productsReceived, SetProductsReceived] = useState(0);


  const [productsReturnMonthCurrent, SetProdcustReturnMonthCurrent] =
    useState(0);
    const [productsReturn, SetProductsReturn] = useState(0);

  

  const fetchUserByMonth = async () => {
    const fetchData = await fetch(Api.userByMonth.url, {
      method: Api.userByMonth.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      SetUserByMonth(dataResponse?.data);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };
  const fetchAllUsers = async () => {
    const fetchData = await fetch(Api.allUser.url, {
      method: Api.allUser.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      SetAllusers(dataResponse?.data?.length);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };
  const fetchOrderByCurrentMonth = async () => {
    const fetchData = await fetch(Api.ordersByCurrentMonth.url, {
      method: Api.ordersByCurrentMonth.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      setOrderbyCurrentMonth(dataResponse?.data);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  const fetAllorder = async () => {
    const fetchData = await fetch(Api.allOrder.url, {
      method: Api.allOrder.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      SetAllOrder(dataResponse?.data?.length);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  const fetchOrderReceivedMonthCurrent = async () => {
    const fetchData = await fetch(Api.orderReceivedMonthCurrent.url, {
      method: Api.orderReceivedMonthCurrent.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      SetOrderReceivedMonthCurrent(dataResponse?.data);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  const fetchOrderReceived = async () => {
    const fetchData = await fetch(Api.orderReceived.url, {
      method: Api.orderReceived.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      SetOrderReceived(dataResponse?.data);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  const fetOrderReturn = async () => {
    const fetchData = await fetch(Api.orderReturn.url, {
      method: Api.orderReturn.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      SetOrderReturn(dataResponse?.data);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  const fetchOrderReturnMonthCurrent = async () => {
    const fetchData = await fetch(Api.orderReturnMonthCurrent.url, {
      method: Api.orderReturnMonthCurrent.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      SetOrderReturnMonthCurrent(dataResponse?.data);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  const fetchProductsReceivedMonthCurrent = async () => {
    const fetchData = await fetch(Api.productReceivedMonthCurrent.url, {
      method: Api.productReceivedMonthCurrent.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      SetProductsReceivedMonthCurrent(dataResponse?.data);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  const fetchProductsReceived = async () => {
    const fetchData = await fetch(Api.productReceived.url, {
      method: Api.productReceived.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      SetProductsReceived(dataResponse?.data);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  const fetchProductsReturn = async () => {
    const fetchData = await fetch(Api.productReturn.url, {
      method: Api.productReturn.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      SetProductsReturn(dataResponse?.data);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };
  const fetchProductsReturnMonthCurrent = async () => {
    const fetchData = await fetch(Api.productReturnMonthCurrent.url, {
      method: Api.productReturnMonthCurrent.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      SetProdcustReturnMonthCurrent(dataResponse?.data);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };




 
  useEffect(() => {
   
    fetchUserByMonth();
    fetchAllUsers();
    fetchOrderByCurrentMonth();
    fetAllorder();
    fetchOrderReceivedMonthCurrent();
    fetchOrderReceived();
    fetOrderReturn();
    fetchOrderReturnMonthCurrent();
    fetchProductsReceivedMonthCurrent()
    fetchProductsReceived()
    fetchProductsReturn()
    fetchProductsReturnMonthCurrent()
   
  }, []);

  return (

    <>
        <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <Card text="All Users of the current month" number={userByMonth} />
        <Card text="All Users" number={allUsers} />
        <Card
          text="All Orders of the current month"
          number={OrderByCurrentMonth}
        />
        <Card text="All Orders" number={allOrder} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-5">
        <Card
          text="All Orders received for the current month"
          number={orderReceivedMonthCurrent}
        />
        <Card text="All Orders received" number={orderReceived} />
        <Card
          text="All Orders return for the current month"
          number={orderReturnMonthCurrent}
        />
        <Card text="All Orders return" number={orderReturn} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-5">
        <Card
          text="All Products received for the current month"
          number={productsReceivedMonthCurrent}
        />
        <Card text="All Products received" number={productsReceived} />
        <Card
          text="All Products return for the current month"
          number={productsReturnMonthCurrent}
        />
        <Card text="All Products return" number={productsReturn} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-5">
        <div className="items-center p-6 bg-white rounded-xl shadow-md space-y-4 max-w-full sm:max-w-md lg:max-w-lg">
        
        <div className="text-lg font-medium text-black">orders grouped by month</div>
        <OrderChart />
        </div>

        <div className="items-center p-6 bg-white rounded-xl shadow-md space-y-4 max-w-full sm:max-w-md lg:max-w-lg">
        <div className="text-lg font-medium text-black">total grouped by month</div>
        <ProductChart />
        </div>

        <div className="w-[100%]">
       
        <ProfitChart />
        </div>
    
   
      </div>

     
        
      
    </div>

    </>

  );
}

export default DashBord;
