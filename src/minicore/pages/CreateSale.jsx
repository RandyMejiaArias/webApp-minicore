import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { MinicoreLayout } from "../layout/MinicoreLayout"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { startFetchingProducts, startSavingSale } from '../../store/product/thunks';
import { Form, Formik } from 'formik';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

export const CreateSale = () => {

  const { products, total, error } = useSelector(state => state.product);

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [productPrice, setProductPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0)
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startFetchingProducts());
    if(error)
      setIsError(true)
    else {
      setIsError(false);
      setIsLoading(false);
      setIsRefetching(false);
    }
  }, [])

  const handleProductPrice = (id) => {
    const product = products.find(product => product._id === id.target.value);
    setProductPrice(product.price);
  }
  
  return (
    <MinicoreLayout>
      <Grid container spacing={0} sx={{ mb: 2 }}>
        <Grid item sx={{ ml: 4 }}>
          <Typography variant="h4" color="primary.main" component="div">
            Create Sale
          </Typography>
        </Grid>
        <Box sx={{ width: '60%'}}>
          <Formik
            initialValues={ {
              product: '',
              quantity: 0,
              date: dayjs()
            }}
            onSubmit= {(values, {resetForm}) => {
              values.date = new Date(values.date.$d).toISOString();

              dispatch(startSavingSale(values));
              resetForm();
            }}
          >
            { ({handleChange, handleBlur, values, submitForm, setFieldvalue }) => (
              <Form>
                <Grid 
                  container
                  direction='column'
                  alignItems='center'
                  justifyContent='center'
                  sx={{ minHeight:'calc(75vh - 110px)'}}
                  spacing={ 2 }
                >
                  <Grid 
                    container 
                    direction='column' 
                    alignItems='start' 
                    spacing={ 2 }
                    >
                    <Grid 
                      spacing={ 2 }
                      container 
                      direction='column' 
                      justifyContent='space-evenly' 
                      sx={{ mt: 4 }}
                    >
                      <FormControl sx={{ width: '100%', mb: 2}}>
                        <InputLabel id='product-select'>Product</InputLabel>
                        <Select
                          name='product'
                          value={values.product}
                          onChange={(e) => {
                            handleProductPrice(e)  
                            handleChange(e)
                          }}
                          onBlur={handleBlur}
                          label='Product'
                        >
                          {
                            products.map((product) => {
                              return (
                                <MenuItem key={product._id} value={product._id}>{product.name}</MenuItem>
                              )
                            })
                          }
                        </Select>
                      </FormControl>
                      <TextField 
                        name='quantity'
                        value={values.quantity}
                        onChange={(e) => {
                          setTotalAmount(productPrice * e.target.value)
                          handleChange(e)
                        }}
                        sx={{ width: '100%', mb:2 }} 
                        label='Quantity' 
                        type='number' 
                        placeholder='Quantity' 
                        onBlur={handleBlur}
                      ></TextField>
                      <TextField 
                        name='Total Amount'
                        disabled
                        value={totalAmount}
                        sx={{ width: '100%', mb:2 }} 
                        label='Total Amount' 
                        type='number'
                      ></TextField>

                      <DatePicker sx={{ width: '100%', mb:2}}
                        label='Date'
                        value={values.date}
                        onChange={date => setFieldvalue('date', date)}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    variant="contained"
                    onClick={ submitForm }
                  >
                    Save
                  </Button>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Grid>
    </MinicoreLayout>
  )
}