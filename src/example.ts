import { PageOptions } from './'
import Model from './'

interface User {
  id: string;
  name: string;
  // all properties
}

const userModel = new Model<User>({
  domain: '// domain ',
  db: '// database',
  table: '// table',
  https: false
})

const users = userModel
  .where({ field: 'name', operator: '$eq', value: 'Luiz' })
  .pagination({ page: 1, pageSize: 10 })
  .run()
  .then((response: User[] | { pagination: PageOptions; items: User[] }) => {
    console.log(response)
  })
  .catch((request: any) => {
    console.log(request.response)
  })

console.log(users)