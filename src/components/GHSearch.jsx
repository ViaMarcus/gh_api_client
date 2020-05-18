import React, { Component } from 'react'
import { Button, Input, Form } from 'semantic-ui-react'
import axios from 'axios'

class GHSearch extends Component {
  state = {
    result: [],
    searchMessage: "",
    user: ""
  }

  searchHandler = async event => {
    let response;
    const query = event.target.sfield.value
    try {
      response = await axios.get(`https://api.github.com/search/users?q=${query}`)
      let length = response.data.items.length
      if (length == 0) {
        this.setState({ searchMessage: "No results found"})
      } else {
        this.setState({ result: response.data.items, searchMessage: length > 30 ? `Showing results 1-30 of length` : `Showing ${length} results`})
      }
    } catch (error) {
      this.setState({ searchMessage: "Something went wrong"})
    }
  }

  renderResults = (items) => {
    let table = items.map((item, index) => {
      return(
        <div id={"search-result-" + index}>
          <h3>{item.login}</h3>
        </div>
      )
    })
    return table
  }

  render(){
    return (
    <>
      <Form onSubmit={this.searchHandler}>
        <Input type="text" id="search-field" name="sfield" placeholder="Input GH username"/>
        <Button name="search-btn" id="search-submit">Search</Button>
      </Form>
      <p id="search-message">{this.state.searchMessage}</p>
      <div id="result">
        <p>{this.renderResults(this.state.result)}</p>
      </div>
      
    </>
  )
  }
}

export default GHSearch
