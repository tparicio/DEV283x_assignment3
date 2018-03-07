const mongodb = require('mongodb')
const addresses = require('./data/m3-customer-address-data.json')
const customers = require('./data/m3-customer-data.json')
const async = require('async')

// mongodb connection
const url = 'mongodb://localhost:27017/edx-course-db'

// make mongo connection
mongodb.MongoClient.connect(url, (error, db) => {
    if (error) return process.exit(1)

    // clean collection before insert new customers
    db.collection('customers')
      .remove({},(error,res) => {
          if (error) return process.exit(1)
    })

    // get items to process from CLI arguments
    // use 1000 as default value
    let items = parseInt(process.argv[2]) || 100
    let tasks = []
    let iterations = customers.length / items

    // method for process customers in chunks
    task = (items, offset) => {
        return (callback) => {
            let chunk = []

            for (i = offset ; i < items + offset ; i++) {
                if (customers[i]) {
                    chunk.push(Object.assign(customers[i], addresses[i]))
                }
            }

            db.collection('customers')
            .insert(chunk, (error, results) => {
                if (error) return next(error)

                console.log(`${results.insertedCount} customers added to collection`)

                callback(error, results)
            })
        }
    }

    // process customers in asynchronous chunks
    // push all callback inside a tasks callbacks array
    for (i = 0 ; i < iterations ; i++) {
        //console.log(`queue task ${i}`)
        tasks.push(task(items, i*items))
    }

    // check tasks is not empty
    if (! tasks.length) {
        console.error('No tasks to execute')
    }

    // process chunks asynchronous by async parallel
    async.parallel(tasks, (error, results) => {
        if (error) console.error(error)
        
        console.log('migration is finished')
        db.close()
    })
})