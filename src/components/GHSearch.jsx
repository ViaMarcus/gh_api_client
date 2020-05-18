import React from 'react'
import { Button, Input } from 'semantic-ui-react'

const GHSearch = () => {
  return (
    <>
      <Input type="text" id="search-field" name="search" placeholder="Input GH username"/>
      <Button name="search" id="search-submit">Search</Button>
    </>
  )
}

export default GHSearch
