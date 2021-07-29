import { NextApiRequest, NextApiResponse } from 'next';

const users = (request: NextApiRequest, response: NextApiResponse) => {
    console.log(request.query);

    const user = [
        {id: 1, name: 'Rafael'},
        {id: 2, name: 'Kellin'},
    ]

    return response.json(user[request.query.id])
}

export default users;