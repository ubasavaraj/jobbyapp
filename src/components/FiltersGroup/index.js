import Profile from '../Profile'

import './index.css'

const FiltersGroup = props => {
  const renderRatingsFiltersList = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(category => {
      const {changeRating, activeRatingId} = props
      const onClickRatingItem = () => changeRating(category.salaryRangeId)

      const ratingClassName =
        activeRatingId === category.salaryRangeId
          ? `and-up active-rating`
          : `and-up`

      return (
        <li className="rating-item">
          <input
            type="radio"
            id={category.salaryRangeId}
            key={category.salaryRangeId}
            onClick={onClickRatingItem}
          />

          <label htmlFor={category.salaryRangeId} className={ratingClassName}>
            {category.label}
          </label>
        </li>
      )
    })
  }

  const renderRatingsFilters = () => (
    <div>
      <hr />
      <h1 className="rating-heading">Salary Range</h1>
      <ul className="ratings-list">{renderRatingsFiltersList()}</ul>
    </div>
  )

  const renderCategoriesList = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(category => {
      const {changeCategory, activeCategoryId} = props
      const onClickCategoryItem = () =>
        changeCategory(category.employmentTypeId)
      const isActive = category.categoryId === activeCategoryId
      const categoryClassName = isActive
        ? `category-name active-category-name`
        : `category-name`

      return (
        <li className="category-item">
          <input
            type="checkbox"
            id={category.employmentTypeId}
            key={category.employmentTypeId}
            onClick={onClickCategoryItem}
          />

          <label
            htmlFor={category.employmentTypeId}
            className={categoryClassName}
          >
            {category.label}
          </label>
        </li>
      )
    })
  }

  const renderProductCategories = () => (
    <>
      <hr />
      <h1 className="category-heading">Type of Employment</h1>
      <ul className="categories-list">{renderCategoriesList()}</ul>
    </>
  )

  return (
    <div className="filters-group-container">
      <Profile />
      {renderProductCategories()}
      {renderRatingsFilters()}
    </div>
  )
}

export default FiltersGroup
