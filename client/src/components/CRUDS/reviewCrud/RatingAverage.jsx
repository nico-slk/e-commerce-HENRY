import React from 'react'
import { connect } from 'react-redux'
import { MDBIcon } from 'mdbreact';


export const RatingAverage = ({reviews}, id) => {
  let averageRating = !reviews ? 0 : reviews.map(e => e.rating).reduce((a,b)=>a + b)/reviews.length

  let stars = []
  for(let i = 0; i < Math.floor(averageRating); i++){
    stars.push(['thumbs-up', "text-warning mr-1"])
  }
  for(let j = stars.length; j < 5; j++){
    stars.push(["thumbs-up", "text-dark mr-1"])
  }
  
  return (
    <div >
      <div className="d-flex flex-row">
        <h1 className="d-inline mr-3">{averageRating.toFixed(1)}</h1>
        <div className="d-flex flex-column">
          <div>
            {stars.map((e, i) => <span key={e+i} className="mr-1"><MDBIcon icon={e[0]} className={e[1]} /></span>)}
          </div>
          <p>Promedio entre {!reviews ? 0 : reviews.length} opiniones</p>
        </div>
      </div>        
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(RatingAverage)
