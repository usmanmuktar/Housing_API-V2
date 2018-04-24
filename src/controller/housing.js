import mongoose from 'mongoose';
import { Router } from 'express';
import Housing from '../model/housing';

export default({ config, db }) => {
  let api = Router();

/**     CRUD
  Create Read Update Delete
**/

  // Create
  // '/housing/add'
  api.post('/add', (req, res) => {
    let newHouse = new Housing();
    newHouse.SaleID = req.body.SaleID;
    newHouse.ZPID = req.body.ZPID;
    newHouse.Address = req.body.Address;
    newHouse.Locality = req.body.Locality;
    newHouse.State = req.body.State;
    newHouse.ZipCode = req.body.ZipCode;
    newHouse.Price = req.body.Price;
    newHouse.Latitude = req.body.Latitude;
    newHouse.Longitude = req.body.Longitude;

    newHouse.save(err => {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Housing saved successfully'});
    });
  });

  // '/housing - Read all houses and return the selected fields Address, Locality, State, ZipCode and Price
  api.get('/', (req, res) => {
    Housing.find({}, {'Address': 1, 'Locality' : 1, 'State' : 1, 'ZipCode' : 1, 'Price' : 1}, (err, housings) => {
      if (err) {
        res.send(err);
      }
      res.send(housings);
    });
  });

  // '/housing/:State' - Read all houses filtered by State and return the selected fields Address, Locality, State, ZipCode and Price
  api.get('/State=:State', (req, res) => {
    Housing.find({'State': req.params.State}, {'Address': 1, 'Locality' : 1, 'State' : 1, 'ZipCode' : 1, 'Price' : 1}, (err, housings) => {
      if (err) {
        res.send(err);
      }
      res.send(housings);
    });
  });


  // 'housing/State=:State?Locality=:Locality' - Read all houses filtered by State, Locality and return the selected fields Address, Locality, State, ZipCode and Price
  api.get('/State=:State/Locality=:Locality', (req, res) => {
    Housing.find({'State': req.params.State, 'Locality': req.params.Locality}, {'Address': 1, 'Locality' : 1, 'State' : 1, 'ZipCode' : 1, 'Price' : 1}, (err, housings) => {
      if (err) {
        res.send(err);
      }
      res.send(housings);
    });
  });


  // 'housing/State=:State&Locality=:Locality&ZipCode=:ZipCode' - Read all houses filtered by State, Locality, ZipCode and return the selected fields Address, Locality, State, ZipCode and Price
  api.get('/State=:State/Locality=:Locality/ZipCode=:ZipCode', (req, res) => {
    Housing.find({'State': req.params.State, 'Locality': req.params.Locality, 'ZipCode': req.params.ZipCode}, {'Address': 1, 'Locality' : 1, 'State' : 1, 'ZipCode' : 1, 'Price' : 1}, (err, housings) => {
      if (err) {
        res.send(err);
      }
      res.send(housings);
    });
  });

  // '/housing/Coordinates - Read all houses and return the Coordinates ( Longitude and Latitude )
  api.get('/Coordinates', (req, res) => {
    Housing.find({}, {'_id' : 0, 'Longitude' : 1, 'Latitude' : 1}, (err, housings) => {
      if (err) {
        res.send(err);
      }
      res.send(housings);
    });
  });

  // '/housing/Coordinates/:State' - Read all houses filtered by State and return the Coordinates ( Longitude and Latitude )
  api.get('/Coordinates/State=:State', (req, res) => {
    Housing.find({'State': req.params.State}, {'_id' : 0, 'Longitude' : 1, 'Latitude' : 1}, (err, housings) => {
      if (err) {
        res.send(err);
      }
      res.send(housings);
    });
  });


  // 'housing/Coordinates/State=:State?Locality=:Locality' - Read all houses filtered by State, Locality and return the Coordinates ( Longitude and Latitude )
  api.get('/Coordinates/State=:State/Locality=:Locality', (req, res) => {
    Housing.find({'State': req.params.State, 'Locality': req.params.Locality}, {'_id' : 0, 'Longitude' : 1, 'Latitude' : 1}, (err, housings) => {
      if (err) {
        res.send(err);
      }
      res.send(housings);
    });
  });


  // 'housing/Coordinates/State=:State&Locality=:Locality&ZipCode=:ZipCode' - Read all houses filtered by State, Locality, ZipCode and return the Coordinates ( Longitude and Latitude )
  api.get('/Coordinates/State=:State/Locality=:Locality/ZipCode=:ZipCode', (req, res) => {
    Housing.find({'State': req.params.State, 'Locality': req.params.Locality, 'ZipCode': req.params.ZipCode}, {'_id' : 0, 'Longitude' : 1, 'Latitude' : 1}, (err, housings) => {
      if (err) {
        res.send(err);
      }
      res.send(housings);
    });
  });



  // 'housing/:id' - Read
  api.get('/:id', (req, res) => {
    Housing.findById(req.params.id, (err, housing) => {
      if (err) {
        res.send(err);
      }
      res.send(housing);
    });
  });


  // 'housing/:id' - update
  api.put('/:id', (req, res) => {
    Housing.findById(req.params.id, (err, housing) => {
      if (err) {
        res.send(err);
      }
      housing.name = req.body.name;
      housing.save(err => {
        if (err) {
          res.send(err);
        }
        res.json({message: "Housing info updated"});
      });
    });
  });


  // 'housing/:id' - Delete
  api.delete('/:id', (req, res) => {
    Housing.findById(req.params.id, (err, housing) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      if (housing === null) {
        res.status(404).send("Housing not Found");
        return;
      }
      Housing.remove({
        _id: req.params.id
      }, (err, housing) => {
        if (err) {
          res.status(500).send(err);
          return;
        }
      res.json({ message: "Housing successfully deleted!"});
      });
    });
  });


  return api;
}
