import { Link } from "react-router-dom"

export const DashboardBradCrumbs = (props) => {
    return <>
        <div className='mb-4 shadow-md py-3 px-4 font-heading text-primary flex justify-between items-center'>
            <h2 className=''>{props.name}</h2>
            <Link to="/dashboard"><span class="material-symbols-outlined text-primary">
                dashboard
            </span></Link>
        </div>
    </>
}