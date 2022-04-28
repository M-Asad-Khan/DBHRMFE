import React,{useState} from "react";
import { Rating } from "react-simple-star-rating";
const RatingAtom=(props)=>{
 
return(
    <Rating
    onClick={props.handleRating}
    ratingValue={props.rating}
    size={30}
    label
    transition
    fillColor='orange'
    emptyColor='gray'
    className='foo' // Will remove the inline style if applied
  />
)

}
export default RatingAtom;