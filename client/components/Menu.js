import React from 'react';
import { Link } from 'react-router';
import MenuItem from './MenuItem';

class Menu extends React.Component {
  state = { menu: {}, menu_items: [] };

  componentDidMount() {
    $.ajax({
      url: `/api/menus/${this.props.params.id}`,
      type: 'GET',
      dataType: 'JSON'
    }).done( menu => {
      this.setState({ ...menu });
    }).fail( data => {
      console.log(data);
    });
  }

  // addMenuItem = (e) => {
  //   e.preventDefault();
  //   $.ajax({
  //     url: '/api/menus',
  //     type: 'POST',
  //     dataType: 'JSON',
  //     data: { menu: { name: this.refs.name.value }}
  //   }).done( menu => {
  //     this.setState({ menus: [...this.state.menus, menu] });
  //     this.refs.addForm.reset();
  //   }).fail( data => {
  //     console.log(data);
  //   });
  // }

  updateMenuItem = (name, description, price, id) => {
    let menuId = this.state.menu.id 
    console.log(this.state.menu.id)
    $.ajax({
      url: `/api/menus/${menuId}/menu_items/${id}`,
      type: 'PUT',
      data: { menu_item: {name, description, price } }
    }).done( data => {
      let menu_items = this.state.menu_items.map( item => {
        if (item.id === id)
          return data
        else
          return item
      })
      this.setState({ menu_items })
    }).fail(data => {
      console.log(data);
    })
  }

  deleteMenuItem = (menu_id, menu_item_id) => {
    $.ajax({
      url: `/api/menus/${menu_id}/menu_items/${menu_item_id}`,
      type: 'DELETE',
      dataType: 'JSON'
    }).done( menu => {
      let menu_items = this.state.menu_items.filter( menuItem => 
        { return menuItem.id !== menu_item_id });
      this.setState({ menu_items });
    }).fail( data =>{
      console.log(data);
    })
  }

  displayMenuItems = () => {
    return this.state.menu_items.map( menu_item => {
      return(
        <MenuItem key={menu_item.id} deleteMenuItem={ this.deleteMenuItem } menu_item={menu_item} updateMenuItem={ this.updateMenuItem} />
      )
    });
  }

  render() {
    return(
      <div>
        <h1>{this.state.menu.name}</h1>
        <Link to='/menus' className='btn btn-default'>All Menus</Link>
        <h3>All Menu Items</h3>
        <div className="panel-group" id="accordion" role="tablist">
          { this.displayMenuItems() }
        </div>
      </div>
    );
  }
}

export default Menu;