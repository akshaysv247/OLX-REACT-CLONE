import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext,AuthContext} from '../../store/FirebaseContext';
import { useHistory } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import { Form } from 'semantic-ui-react';

const Create = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  const history = useHistory()
  // const [name,setName]=useState('');
  // const [category,setCategory]=useState('');
  // const [price,setPrice]=useState('');
  const [image,setImage]=useState(null);
  const date = new Date()
  // const handleSubmit1 = ()=>{
    
  // }

  const onSubmit = (data) => {
    console.log(data);
    firebase
      .storage()
      .ref(`/image/${image.name}`)
      .put(image)
      .then(({ ref }) => {
        ref.getDownloadURL().then((url) => {
          console.log(url);
          firebase.firestore().collection("products").add({
            name:data.Name,
            category:data.category,
            price:data.Price,
            url,
            userId: user.uid,
            createdAt: date.toDateString(),
          });
          history.push("/");
        });
      });
  };
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Field>
              <label htmlFor="fname">Name</label>
              <br />
              <input
                className="input"
                type="text"
                id="fname"
                name="Name"
                {...register("Name", { required: true, maxLength: 15 })}
              />
            </Form.Field>
            <br />
            {errors.Name && <p>Please check the Name</p>}
            <Form.Field>
              <label htmlFor="fname">Category</label>
              <br />
              <input
                className="input"
                type="text"
                id="fname"
                name="category"
                {...register("category", { required: true, maxLength: 10 })}
              />
            </Form.Field>
            {errors.category && <p>Please check the category</p>}

            <br />
            <Form.Field>
              <label htmlFor="fname">Price</label>
              <br />
              <input
                className="input"
                type="number"
                id="fname"
                name="Price"
                {...register("Price", { required: true, maxLength: 10 })}
              />
            </Form.Field>
            <br />
            {errors.Price && <p>Please check the Price</p>}

            <br />
            <img
              alt="Posts"
              width="200px"
              height="200px"
              src={image ? URL.createObjectURL(image) : "image"}
            ></img>

            <br />
            <input
              required
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              type="file"
            />
            <br />
            <button type="submit" className="uploadBtn">
              upload and Submit
            </button>
          </Form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
