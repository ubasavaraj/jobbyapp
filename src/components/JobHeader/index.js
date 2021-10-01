import {BsSearch} from 'react-icons/bs'

import './index.css'

const JobHeader = props => {
  const onEnterSearchInput = event => {
    const {enterSearchInput} = props
    if (event.key === 'Enter') {
      enterSearchInput()
    }
  }

  const onChangeSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event.target.value)
  }
  const onClickSearchInput = () => {
    const {enterSearchInput} = props
    enterSearchInput()
  }

  const renderSearchInput = () => {
    const {searchInput} = props
    return (
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />

        <button
          type="button"
          testId="searchButton"
          onClick={onClickSearchInput}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  return <div className="products-header">{renderSearchInput()}</div>
}

export default JobHeader
