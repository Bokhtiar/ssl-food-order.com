import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { NetworkServices } from '../../network/index'
import { useCallback, useEffect, useState } from "react"
import { BreadCrumbs } from "../../components/breadCrumbs"
import { networkErrorHandeller } from "../../utils/helper"
import { SkeletonTable } from '../../components/loading/skeleton-table';

export const DesignationList = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    /* fetchData */
    const fetchData = useCallback(async () => {
        try {
            setLoading(true)
            const response = await NetworkServices.Designation.index()
            if (response.status === 200) {
                setData(response.data.data)
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            networkErrorHandeller(error)
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const columns = [
    
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: "Action",
            cell: (row) => (
                <div className="flex gap-1">
                    <Link to={`/dashboard/designation/edit/${row.designation_id}`}>
                        <span className="bg-green-500 text-white btn btn-sm material-symbols-outlined">
                            edit
                        </span>
                    </Link>

                    {/* <span onClick={() => destroy(row.designation_id)}>
                        <span className="bg-red-500 text-white btn btn-sm material-symbols-outlined">
                            delete
                        </span>
                    </span> */}
                </div>
            ),
        },
    ];

    return <>
        <BreadCrumbs title="Designation List" link="/dashboard/designation/create" icon="add" />

        <section className='my-5'>
            <div className='shadow-md p-4 px-6 rounded-md'>
                {loading ? <SkeletonTable /> :
                    <DataTable
                        columns={columns}
                        data={data}
                        pagination
                        title="Designation List"
                    />
                }
            </div>
        </section >
    </>
}