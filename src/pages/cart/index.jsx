import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { DashboardBradCrumbs } from '../../components/DashboardBradCrumbs';
import { ImageShow } from '../../utils/helper';
import { useEffect, useState } from 'react';

export const Cart = () => {
    const [carts, setCart] = useState([])
    /** cart list */
    // const carts = JSON.parse(localStorage.getItem('carts')) || []
    console.log("carts", carts);
    const deleteCart = (id) => {
        console.log("id", id);
        var jsonData = JSON.parse(localStorage.getItem("carts")) || [];

        function removeItemByIndex(indexToRemove) {
            jsonData.splice(indexToRemove, 1);
        }

        removeItemByIndex(id);
        localStorage.setItem("carts", JSON.stringify(jsonData));
    };

    useEffect(()=> {
        const carts = JSON.parse(localStorage.getItem('carts')) || []
        setCart(carts)
    },[carts])


    const columns = [
        {
            name: 'Image',
            cell: (row) => (
                <img
                    src={ImageShow( row?.image )}
                    alt="Company avatar"
                    className="h-16 w-16 p-2 rounded-full"
                />
            ),
        }, 
        {
            name: 'Title',
            selector: row => row.title,
        },
        // {
        //     name: "Salary",
        //     selector: (row) => `TK ${row.start_salary}-${row.end_salary}`,
        // },
        {
            name: 'Price',
            selector: row => `TK ${row.price}`,
        },
        {
            name: 'Quantity',
            selector: row => `QTY ${row.qty}`,
        },
        {
            name: "Action",
            minWidth: "150px",
            cell: (row, index) => (
                <div className="flex gap-1">
                    {/* <Link to={`/dashboard/jobs/show/${row.id}`}>
                        <span class="material-symbols-outlined text-gray-600 text-[20px]">
                            visibility
                        </span>
                    </Link> */}
                    <span onClick={() => deleteCart(index)} >
                        <span class="material-symbols-outlined text-gray-600 text-[20px]">
                            delete
                        </span>
                    </span>
                </div>
            ),
        },
    ];

    return <>
        <DashboardBradCrumbs name="My Cart Item"></DashboardBradCrumbs>
        <div className=' shadow-md p-4'>
            <DataTable
                columns={columns}
                data={carts}
                pagination
            />
        </div>
    </>
}