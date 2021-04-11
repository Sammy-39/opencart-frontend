import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import StarRatings from 'react-star-ratings';
import M from 'materialize-css'

import { getProductDetails, reviewProduct } from '../actions/products'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import '../styles/productDetails.css'

const ProductDetails = ({match}) => {

    const params = useParams()
    const history = useHistory()

    const reviewFormModalRef = useRef(null)

    const dispatch = useDispatch()
    const { user } = useSelector(state=>state.User)
    const {loading, error, product} = useSelector(state => state.Product)
    const { loading:reviewLoading, message:reviewMessage, error:reviewError } = useSelector(state=>state.ProductReview)

    const [qty, setQty] = useState(1)
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState(0)
    const [modalInstance, setModalInstance] = useState('')
    
    useEffect(() => {
        if(Object.keys(user).length!==0){
            setModalInstance(M.Modal.init(reviewFormModalRef.current))
        }
        dispatch(getProductDetails(params.id))
        // eslint-disable-next-line
    }, [])

    useEffect(()=>{
        M.Toast.dismissAll()
        if(error){ M.toast({html: error , classes: '#dd2c00 deep-orange accent-4'}) }
    },[error])

    useEffect(()=>{
        if(reviewMessage){
            M.Toast.dismissAll()
            setComment('')
            setRating(0)
            modalInstance.close()
            M.toast({html: reviewMessage ,classes: '#33691e light-green darken-4'})
            dispatch({type:'PRODUCT_REVIEW_RESET'}) 
            dispatch(getProductDetails(params.id))
        }
        // eslint-disable-next-line
    },[reviewMessage])

    useEffect(()=>{
        if(reviewError){ 
            M.Toast.dismissAll()
            M.toast({html: reviewError , classes: '#dd2c00 deep-orange accent-4'})
            dispatch({type:'PRODUCT_REVIEW_RESET'}) 
        }
        // eslint-disable-next-line
    },[reviewError])

    const addToCart = () =>{
        history.push(`/cart/${params.id}?qty=${qty}`)
    }

    const handleModalClose = () =>{
        setComment('')
        setRating(0)
        modalInstance.close()
    }

    const handleReviewSubmit = (e) =>{
        e.preventDefault()
        dispatch(reviewProduct(params.id,{rating,comment}))
    }

    return (
        <div className="prod-details">
           { 
                loading ? <Loader /> : !error &&
                <div className="prod-con">
                    <div className="prod-details-body">
                        <div className="prod-leftbar">
                            <div className="prod-img">
                                <img src={product.image} alt="" />
                            </div>
                            <div className="prod-btn">
                                <button className="btn btn-add-cart #ffc400 amber accent-3" onClick={addToCart}
                                disabled={!product.countInStock>0}> 
                                    <i className="material-icons">shopping_cart</i> Add To Cart 
                                </button>
                                <button className="btn btn-buy #ff6d00 orange accent-4" disabled={!product.countInStock>0}>
                                    <i className="material-icons">bolt</i> Buy Now 
                                </button>
                            </div>
                        </div>
                        <div className="prod-rightbar">
                        <h5 className="prod-name">{product.name}</h5>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        <h6 className="prod-price"> Price: &#8377;{product.price} </h6>
                        <p className="prod-status"> 
                            Status: { product.countInStock>0? 
                                <span className="#827717 lime darken-4"> In Stock </span> :  
                                <span className="#d50000 red accent-4"> Out of Stock</span> } 
                        </p>
                        { product.countInStock>0 && 
                          <p className="prod-qty">
                              Quantity: 
                              <select className="browser-default" value={qty} onChange={e=>setQty(e.target.value)}>
                                    {Array(product.countInStock).fill().map((_,idx)=>(
                                        <option key={idx+1} value={idx+1}> {idx+1} </option> 
                                    ))}
                              </select>
                          </p>
                        }
                        <p className="prod-desc"> Description: {product.description} </p>
                    </div>
                    </div>
                    <div className='prod-review'>
                        <div className="prod-review-header">
                            <p> Reviews and Ratings </p>
                            {
                                Object.keys(user).length!==0 && 
                                <button data-target="review-form" className="btn #1976d2 blue darken-2 modal-trigger"> 
                                    { Object.keys(user).length!==0 && product && product.reviews && 
                                    product.reviews.find(review=>review.user===user._id) ? 
                                    'Update Review' : 'Review' 
                                    }
                                </button>
                            }
                            {
                                Object.keys(user).length===0 && 
                                <button className="btn #1976d2 blue darken-2" 
                                  onClick={()=>history.push(`/login?redirect=${match.url.slice(1)}`)}> 
                                    Login to review 
                                </button>
                            }
                        </div>
                        {
                            product && product.reviews && product.reviews.length===0 && 
                            <div className="no-review">
                                <p> No reviews yet! </p>
                            </div> 
                        }
                        {
                            product && product.reviews && product.reviews.map((review,idx)=>(
                                <div className="prod-review-body" key={idx}>
                                    <div className="review-rating">
                                        <p> {review.rating} <i className="material-icons">star</i> </p>
                                        <p> {review.comment} </p>
                                    </div>
                                    <div className="review-meta">
                                        <p> {review.name} </p>
                                        <p> 
                                            {new Date(review.updatedAt).getDate()}/{new Date(review.updatedAt).getMonth()+1}
                                            /{new Date(review.updatedAt).getFullYear()} 
                                        </p>
                                    </div>
                                </div>
                            )) 
                        }
                    </div>
                </div>
           }
           {
                Object.keys(user).length!==0 &&
                <div id="review-form" className="modal" ref={reviewFormModalRef}>
                    { reviewLoading && <Loader /> }
                    <div className="modal-content">
                        <p> { 
                                Object.keys(user).length!==0 && product && product.reviews && 
                                product.reviews.find(review=>review.user===user._id) ? 
                                'Update Review' : 'Add Review'       
                            } 
                        </p>
                        <div className="review-form-con">
                            <form onSubmit={handleReviewSubmit}>
                                <div className="input-field">
                                    <input id="comment" type="text" required 
                                      value={comment} onChange={e=>setComment(e.target.value)}/>
                                    <label htmlFor="comment">Comment</label>
                                </div>
                                <div className="input-field">
                                    <p> Rating </p>
                                    <div className="review-rating"> 
                                        <StarRatings
                                            rating={rating}
                                            changeRating={(value)=>setRating(value)}
                                            numberOfStars={5}
                                            name='rating'
                                            starDimension='22px'
                                            starHoverColor="#ffd700"
                                            starRatedColor="#ffd700"
                                            starSpacing="0px"
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn add-btn #1976d2 blue darken-2" type="submit">
                                        { 
                                            Object.keys(user).length!==0 && product && product.reviews && 
                                            product.reviews.find(review=>review.user===user._id) ? 
                                            'Update' : 'Add'       
                                        }
                                    </button>
                                    <button className="btn #bf360c deep-orange darken-4" type="button" onClick={handleModalClose}> 
                                        Cancel 
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ProductDetails
