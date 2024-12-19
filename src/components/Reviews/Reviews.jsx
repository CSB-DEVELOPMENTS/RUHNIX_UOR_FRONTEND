import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Review, Loader } from '..';
import { axiosFetch } from '../../utils';
import './Reviews.scss';

const Reviews = ({ gigID }) => {
 
    const { isLoading, error, data } = useQuery({
        queryKey: ['reviews'],
        queryFn: () =>
            axiosFetch.get(`/reviews/${gigID}`)
                .then(({ data }) => data)
                .catch(({ response }) => {
                    console.log(response.data);
                })
    });

    return (
        <div className="reviews">
            <h2>Reviews</h2>
            {isLoading ? (
                <div className='loader'><Loader size={35} /></div>
            ) : error ? (
                'Something went wrong!'
            ) : (
                data.map((review) => <Review key={review._id} review={review} />)
            )}
           
        </div>
    );
};

export default Reviews;
