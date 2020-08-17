import  React  from "react";
// import PropTypes from 'prop-types';


class Cards extends React.Component {
    constructor(){
        super()
    }

    render(){
        return(
            <div className="card m-3 m-auto" style={{width: "20.5rem"}}>
                <img src={`/uploads/${this.props.name}.jpg`} className="card-img-top" alt={`${this.props.name}`} />
                <div className="card-body">
                    <h5 className="card-title">{this.props.name}</h5>
                    <p className="card-text">
                        {this.props.description}
                    </p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <div class="input-group">
                            <span class="input-group-text"><strong>Rate</strong></span>
                            <span class="input-group-text">₹</span>
                            <input type="text" aria-label="Rate" class="form-control bg-light" value={this.props.rate} readOnly />
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div class="input-group">
                            <label class="input-group-text" for="quantity"><strong>Quantity</strong></label>
                            <select class="form-select" id="quantity">
                                <option disabled selected>Choose quantity </option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            <span class="input-group-text">₹</span>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div class="input-group">
                            <span class="input-group-text"><strong>Branch</strong></span>
                            <input type="text" aria-label="Branch" class="form-control bg-light" value={this.props.branch} readOnly />
                        </div>
                    </li>
                </ul>
                <div className="card-body">
                    <button className="btn btn-warning ">Add to Cart 🛒</button>
                    <button className="btn btn-primary ml-5">Wishlist</button>
                </div>
            </div>
        )
    }
};

// Cards.propTypes = {
//     name: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     rate: PropTypes.string.isRequired
//   };

export default Cards