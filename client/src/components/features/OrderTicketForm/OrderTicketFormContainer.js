import { connect } from 'react-redux';
import { addSeatRequest, getRequests } from '../../../redux/seatsRedux';    //loadSeatsRequest 
import OrderTicketForm from './OrderTicketForm';

const mapStateToProps = state => ({
  requests: getRequests(state),
});

const mapDispatchToProps = dispatch => ({
  addSeat: (seat) => dispatch(addSeatRequest(seat)),
  //loadSeats: () => dispatch(loadSeatsRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderTicketForm);