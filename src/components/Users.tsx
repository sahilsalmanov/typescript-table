import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsRequest, fetchProductsSuccess, fetchProductsFailure } from '../store/actions/stateActions';


const Users: React.FC = () => {
  const products = useSelector((state: any) => state.generalState.products);
  const isLoading = useSelector((state: any) => state.generalState.isLoading);
  const error = useSelector((state: any) => state.generalState.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsRequest());

    axios('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        dispatch(fetchProductsSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchProductsFailure(err.message));
      });
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Username</th>
          <th>Email</th>
          <th>Street</th>
          <th>City</th>
          <th>Company Name</th>
        </tr>
      </thead>
      <tbody>
        {products.map((item: Product) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.username}</td>
            <td>{item.email}</td>
            <td>{item?.address?.city}</td>
            <td>{item?.address?.street}</td>
            <td>{item?.company?.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Users;

interface Product {
  id: number
  username: string
  email: string
  address: innerAddress
  company: innerCompany
}

interface innerAddress {
  city: string
  street: string
}
interface innerCompany {
  name: string
}

