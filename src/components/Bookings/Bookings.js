import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [bookings, setBooking] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    useEffect(() => {
        fetch('http://localhost:5000/bookings?email='+ loggedInUser.email,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setBooking(data)
        })
    }, []);
    return (
        <div>
            <h2>You Have: {bookings.length} Bookings.</h2>
            {
                bookings.map(book => <li>{book.name} from: {(new Date(book.checkIn).toDateString('dd/MM/yy'))} to {(new Date(book.checkOut).toDateString('dd/MM/yy'))}</li>)
            }
        </div>
    );
};

export default Bookings;