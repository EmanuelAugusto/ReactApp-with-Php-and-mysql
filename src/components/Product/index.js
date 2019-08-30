import React, { Component } from 'react';
import { Table, Button, Form, FormGroup, Label, Input} from 'reactstrap';

class FormProduct extends Component{

	state = { model: { id: 0, Marca: '', Modelo: '', Ano: '' }};

	setValues = (e, field) => {
		const { model } = this.state;
		model[field] = e.target.value;
		this.setState({model});
		console.log(this.state.model);
	}

	render(){
		return(
           <div>
            <Form>
            <FormGroup>
            <Label for="Marca">Marca:</Label>
            <Input id="Marca" type="text" value={this.state.model.Marca} placeholder="Marca do Carro" onChange={e => this.setValues(e, 'Marca')}/>   
            </FormGroup>
            <FormGroup>
            <div className="form-row">
             <div className="col-md-6">
             <Label for="Modelo">Modelo:</Label>
             <Input id="Modelo" type="text" value={this.state.model.Modelo} placeholder="Modelo" onChange={e => this.setValues(e, 'Modelo')} />
             </div>
             <div className="col-md-6">
             <Label for="Ano">Ano:</Label>
             <Input id="Ano" type="text" value={this.state.model.Ano} placeholder="Ano" onChange={e => this.setValues(e, 'Ano')} />
             </div>
            </div>
            </FormGroup>
            <Button color="primary" block> Salvar Dados </Button>
            </Form>
           </div>
		)
	}
}

class ListProduct extends Component{
	
	render(){
		const { car }  =  this.props;
		console.log(car);
		return(
         <Table className="table-bordered text-center">
         <thead className="thead-dark">
         <tr>
         <th>Id</th>
         <th>Marca</th>
         <th>Modelo</th>
         <th>Ano</th>
         <th>Ações</th>
         </tr>
         </thead>
         <tbody>
           {
           	car.map(car => (
               <tr key={car.id}>
               <td>{car.id}</td>
               <td>{car.marca}</td>
               <td>{car.modelo}</td>
               <td>{car.ano}</td>
               <td> 
               <Button color="info" size="sm">Editar</Button>
               <Button color="danger" size="sm">Deletar</Button>

               </td>
               </tr>
           	))
           }
         </tbody>
         </Table>
	   )
	}
}

export default class ProductBox extends Component {
	url = 'http://localhost/React/libraries/src/api/';

	state = {
		car: [],
	}

	componentDidMount(){
        fetch(this.url)
        .then(response => response.json())
        .then(car => this.setState({car}))
        .catch(e => console.log(e));
	}

	create = (car) => {
		console.log(car)
	}

	render(){
		return(
			<div className="row">
               <div className="col-md-6 my-3">
                <h2 className="font-weight-bold text-center"> Cadastro de Produtos</h2>
                    <FormProduct carCreate={this.create} />
               </div>
               <div className="col-md-6 my-3">
                <h2 className="font-weight-bold text-center">Lista de Produtos</h2>
                    <ListProduct car={this.state.car} />
               </div>
               </div>
	     )
	}
}