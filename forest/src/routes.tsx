import React, {Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import CustomCanvas from "./customCanvas";

export const PATHS: Record<string, string | undefined> = {
    FOREST: '/forest',
}

const routes = (): JSX.Element => (
    <Suspense fallback={<div> petit loader </div>}>
        <Routes>
            <Route path={PATHS.FOREST} element={<CustomCanvas/>}/>
            <Route path={''} element={<CustomCanvas/>}/>

        </Routes>
    </Suspense>

    );

export default routes;