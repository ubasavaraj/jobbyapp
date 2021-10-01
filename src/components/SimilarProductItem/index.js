import {BsFillStarFill} from 'react-icons/bs'

import {GoLocation} from 'react-icons/go'

import {FaSuitcase} from 'react-icons/fa'

import './index.css'

const SimilarProductItem = props => {
  const {productDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    rating,
    title,
    location,
  } = productDetails

  return (
    <div>
      <h1>Similar Jobs</h1>
      <li className="similar-product-item">
        <div>
          <div>
            <img
              className="image"
              src={companyLogoUrl}
              alt="similar job company logo"
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

        <hr />
        <div>
          <h1>Description</h1>
          <p>{jobDescription}</p>
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
        </div>
      </li>
    </div>
  )
}

export default SimilarProductItem
