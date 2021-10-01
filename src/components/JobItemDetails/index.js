import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'

import {GoLocation} from 'react-icons/go'

import {FaSuitcase} from 'react-icons/fa'

import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    productData: {},
    similarProductsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProductData()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    id: data.id,
    employmentType: data.employment_type,
    jobDescription: data.job_description,
    location: data.location,
    title: data.title,
    lifeAtCompany: data.life_at_company,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    skills: data.skills,
  })

  getProductData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = this.getFormattedData(fetchedData.job_details)
      const updatedSimilarProductsData = fetchedData.similar_jobs.map(
        eachSimilarProduct => this.getFormattedData(eachSimilarProduct),
      )
      console.log(updatedData)
      console.log(updatedSimilarProductsData)
      this.setState({
        productData: updatedData,
        similarProductsData: updatedSimilarProductsData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => {
    const {productData} = this.state
    const {id} = productData
    return (
      <div className="product-details-error-view-container">
        <img
          alt="failure view"
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          className="error-view-image"
        />
        <h1 className="Oops! Something Went Wrong">Product Not Found</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <Link to={`/jobs/${id}$`}>
          <button type="button" className="button">
            Retry
          </button>
        </Link>
      </div>
    )
  }

  renderProductDetailsView = () => {
    const {productData, similarProductsData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      rating,
      title,
      skills,
      location,
      lifeAtCompany,
      packagePerAnnum,
    } = productData

    return (
      <div className="product-details-success-view">
        <div className="product-details-container">
          <div>
            <div>
              <img
                className="image"
                src={companyLogoUrl}
                alt="job details company logo"
              />
            </div>
            <div>
              <h1>{title}</h1>
              <p>
                <BsFillStarFill />
                {rating}
              </p>
            </div>
          </div>
          <div>
            <div>
              <p>
                <GoLocation />
                {location}
              </p>
              <p>
                <FaSuitcase />
                {employmentType}
              </p>
            </div>
            <div>
              <p>{packagePerAnnum}</p>
            </div>
          </div>
          <hr />
          <div>
            <h1>Description</h1>
            <a href={companyWebsiteUrl}>Visit</a>
            <p>{jobDescription}</p>
          </div>
        </div>
        <div>
          <h1>Skills</h1>
          <div>
            <ul>
              {skills.map(each => (
                <li>
                  <img src={each.image_url} alt={each.name} />
                  <h1>{each.name}</h1>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1>Life at Company</h1>
            <div>
              <p>{lifeAtCompany.description}</p>
              <img src={lifeAtCompany.image_url} alt="life at company" />
            </div>
          </div>
        </div>
        <h1 className="similar-products-heading">Similar Products</h1>
        <ul className="similar-products-list">
          {similarProductsData.map(eachSimilarProduct => (
            <SimilarProductItem
              productDetails={eachSimilarProduct}
              key={eachSimilarProduct.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderProductDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="product-item-details-container">
          {this.renderProductDetails()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
