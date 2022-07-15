import React from 'react';
import { Fragment } from 'react';
import './App.css';
import { Routes, Route} from "react-router-dom";
import GrillaHeroe from './components/GrillaHeroe';
import DetalleHeroe from './components/DetalleHeroe';
import Batalla from './components/Batalla';
import Home from './components/Home';
import AdminPrincipal from './components/AdminPrincipal';
import AdmPrincipalHeroe from "./components/AdmHeroe/AdmPrincipalHeroe"
import AdmInsertHeroe from "./components/AdmHeroe/AdmInsertHeroe"
import AdmUpdateHeroe from "./components/AdmHeroe/AdmUpdateHeroe"
import AdmDeleteHeroe from "./components/AdmHeroe/AdmDeleteHeroe"
import AdmPrincipalPoderes from "./components/AdmPoderes/AdmPrincipalPoderes"
import AdmInsertPoderes from "./components/AdmPoderes/AdmInsertPoderes"
import AdmUpdatePoderes from "./components/AdmPoderes/AdmUpdatePoderes"
import AdmDeletePoderes from "./components/AdmPoderes/AdmDeletePoderes"
import AdmPrincipalUnion from "./components/AdmUnion/AdmPrincipalUnion"
import AdmInsertUnion from "./components/AdmUnion/AdmInsertUnion"
import AdmUpdateUnion from "./components/AdmUnion/AdmUpdateUnion"
import AdmDeleteUnion from "./components/AdmUnion/AdmDeleteUnion"

const App = () => {


    return(

     
      <Fragment>

        <Routes>

          //Rutas Principales:
          <Route path="/" element={<Home />} />
          <Route path="/grillaHeroe" element={<GrillaHeroe />} />
          <Route path="/detalleHeroe" element={<DetalleHeroe />} />
          <Route path="/batalla" element={<Batalla />} />
          <Route path="/adminPrincipal" element={<AdminPrincipal />} />

          //Rutas Administrador Heroe:
          <Route path="/principalHeroe" element={<AdmPrincipalHeroe />} />
          <Route path="/insertHeroe" element={<AdmInsertHeroe />} />
          <Route path="/updateHeroe/:id" element={<AdmUpdateHeroe />} />
          <Route path="/deleteHeroe" element={<AdmDeleteHeroe />} />

          //Rutas Administrador Poderes:
          <Route path="/principalPoderes" element={<AdmPrincipalPoderes />} />
          <Route path="/insertPoderes" element={<AdmInsertPoderes />} />
          <Route path="/updatePoderes/:id" element={<AdmUpdatePoderes />} />
          <Route path="/deletePoderes" element={<AdmDeletePoderes />} />

          //Rutas Administrador Union:
          <Route path="/principalUnion" element={<AdmPrincipalUnion />} />
          <Route path="/insertUnion" element={<AdmInsertUnion />} />
          <Route path="/updateUnion/:id" element={<AdmUpdateUnion />} />
          <Route path="/deleteUnion" element={<AdmDeleteUnion />} />

        </Routes>

      </Fragment>

    );
}

export default App;
