import React from 'react';

class MenuItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = { editing: false }
  }
  
  
  toggleEditItem = () => {
    this.setState({ editing: !this.state.editing });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let name = this.refs.name.value
    let description = this.refs.description.value
    let price = this.refs.price.value 
    this.props.updateMenuItem(name, description, price, this.props.menu_item.id)
    this.setState({ editing: false })
  }

  render() {
    let menu_item = this.props.menu_item;
    let id = `collapse${menu_item.id}`;
    if (!this.state.editing)
      return(
        <div key={id} className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a role="button" data-toggle="collapse" data-parent="#accordion" href={`#${id}`}>
                  { menu_item.name }
                </a>
              </h4>
            </div>
            <div id={id} className="panel-collapse collapse in" role="tabpanel">
              <div className="panel-body">
                { menu_item.description }
                <hr />
                <i>Price: ${ Math.round(menu_item.price) }</i>
                <br />
                <button 
                  className='btn btn-warning'
                  onClick={ this.toggleEditItem }
                  >
                  Edit
                </button>
                <button 
                  className='btn btn-danger'
                  onClick={ () => this.props.deleteMenuItem(menu_item.menu_id, menu_item.id) }
                  >
                  Delete
                </button>
              </div>
            </div>
          </div>
      )
    else
      return(
        <form onSubmit={ this.handleSubmit }>
          <h1>Editing: { menu_item.name }</h1>
          <input ref='name' type='text' defaultValue={ menu_item.name } required />
          <br />
          <input ref='description' type='textarea' defaultValue={ menu_item.description } required />
          <br />
          <input ref='price' type='text' defaultValue={ menu_item.price } required />
          <br />
          <input type='submit' className='btn btn-primary' />
          <button
            type='button'
            className='btn btn-default'
            onClick={ this.toggleEditItem }
            >
            Cancel
          </button>
        </form>
      )
  }
}

export default MenuItem;
