import {Link} from 'react-router-dom'

import {BsFillStarFill} from 'react-icons/bs'

import {GoLocation} from 'react-icons/go'

import {FaSuitcase} from 'react-icons/fa'

import './index.css'

const JobCard = props => {
  const {productData} = props
  const {
    title,
    rating,
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
  } = productData

  return (
    <div>
      <Link to={`/jobs/${id}`} className="link-item">
        <li className="product-item">
          <div>
            <div>
              <img className="image" src={companyLogoUrl} alt="company logo" />
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
            <p>{jobDescription}</p>
          </div>
        </li>
      </Link>
    </div>
  )
}
export default JobCard
