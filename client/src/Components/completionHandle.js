import React from 'react';

class AddressHandle extends React.Component{

    render(){
        return(
            <div>
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">Your Address</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    ...
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-warning ml-auto">Next</button>
                </div>
            </div>
        )
    }
}

// for FUTURE USE NOT AVAILABLE NOW ..............................................................................................................................................