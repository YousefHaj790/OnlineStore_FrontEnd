import React, { useEffect ,useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, Outlet } from "react-router-dom";
import { getProductsAsync } from "../redux/slices/fetchData";
import SideList from "../Layout/SideList";
import "../Styles/Products.css";
import LoadingGIF from "../Images/loading-loading-forever.gif";

const Categories = () => {
  const dispatch = useDispatch();
  const { Category } = useParams();
const [disabled,setDisabled]=useState(false)



  const { Products, status, error } = useSelector((state) => state.Products);



  useEffect(() => {
    if (Category) {
      
      dispatch(getProductsAsync(Category));
    }
  }, [Category, dispatch]);
  
  if (status === "loading") {
    return (
      <div>
        <SideList />
        <div className="loading-container">
          <img className="Loading" src={LoadingGIF} alt="Loading" />
          <p>Loading Products...</p>
        </div>
      </div>
    );
  }

  if (status === "failed" || error) {
    return (
      <div>
        <SideList />
        <div className="error-message">
          <p>Error: {error || "Something went wrong. Please try again."}</p>
        </div>
      </div>
    );
  }




  return (
    <div>
      <SideList />
      <div  className="Products">
        {Products?.length > 0 ? (
          Products.map((product) => (
        <div onClick={()=>{setDisabled(true)}} style={{pointerEvents: disabled ===false || window.location.pathname ===`/Products/${Category}` ? 'initial':'none'

             }}  key={product._id}>
              <Link
                state={{ product }}
                to={`/Products/${Category}/${product._id}`}
              >
                <div>
                  <img
                    className="imgProduct"
                    style={{ borderRadius: "7px" }}
                    height="300px"
                    width="220px"
                    src={product.src}
                    alt={product.Name || "Product image"}
                  />
                  <p>{product.Name}</p>
                  <p>{product.Price} $</p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div>No products found in this category.</div>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default Categories;
