import React, { Component } from 'react'
import { Button, Input, Form } from 'semantic-ui-react'
import axios from 'axios'

class GHSearch extends Component {
  state = {
    result: "",
    searchMessage: "",
    user: ""
  }

  searchHandler = async event => {
    let message, response;
    const query = event.target.sfield.value
    try {
      response = await axios.get(`https://api.github.com/search/users?q=${query}`)
      let length = response.data.items.length
      if (length == 0) {
        this.setState({ searchMessage: "No results found"})
      } else {
        this.setState({ items: response.data.items, searchMessage: length > 30 ? `Showing results 1-30 of length` : `Showing ${length} results`})
      }
    } catch (error) {
      this.setState({ searchMessage: "Something went wrong"})
    }
    
    debugger;
    this.setState({ result: response.data })
  }

  render(){
    return (
    <>
      <Form onSubmit={this.searchHandler}>
        <Input type="text" id="search-field" name="sfield" placeholder="Input GH username"/>
        <Button name="search-btn" id="search_submit">Search</Button>
      </Form>
      <p id="search-message">{this.state.searchMessage}</p>
      <p>{this.state.result}</p>
    </>
  )
  }
}

export default GHSearch
