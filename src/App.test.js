import React from "react";
import App from "./App";
import ShallowRenderer from 'react-test-renderer/shallow';


describe('#App', () => {
    it("renders correctly", () => {
        const renderer = new ShallowRenderer();

        renderer.render(<App />);

        const result = renderer.getRenderOutput()

        expect(result.type).toBe('div')
        expect(result.props.children.length).toEqual(2)
    })
})
