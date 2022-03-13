import {
    useLazyQuery
} from "@apollo/client";

import { getBookQuery } from '../queries/queries'


function BookDetails() {

    const [searchPosts, { loading: bookLoading }] = useLazyQuery(getBookQuery) //useLazyQuery hook used to send query parameter value to any query request

    if (bookLoading) { return "Loading..." }

    return (
        <div >
            <p>Output Book Details</p>
        </div>
    );
}

export default BookDetails;