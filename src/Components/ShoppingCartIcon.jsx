import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

function ShoppingCartIcon({ count }) {
    return (
        <div
            style={{
                position: 'fixed',
                top: '20px',
                left: '20px',
                transform: 'translateX(-20px)',
                zIndex: 1000,
            }}
        >
            <Link
                to="/shoppingCart"
                style={{
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                }}
            >
                <FaShoppingCart style={{ fontSize: '24px', color: 'black' }} />
                {count > 0 && (
                    <span
                        className="badge bg-danger"
                        style={{
                            position: 'absolute',
                            top: '0px',
                            right: '0px',
                            transform: 'translate(50%, -50%)',
                            borderRadius: '50%',
                            padding: '4px 6px',
                            fontSize: '10px',
                            color: 'white',
                            backgroundColor: 'red',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {count}
                    </span>
                )}
            </Link>
        </div>
    );
}

export default ShoppingCartIcon;
