import React from 'react'
export default function Demo() {
    return (
        <>
            <main>
                <div className="container margin_120_95">
                    <div className="row">
                        <div className="col-lg-12 ml-auto">
                            <nav id="secondary_nav">
                                <div className="container">
                                    <span>Demo</span>
                                </div>
                            </nav>
                            <div className="box_form">
                                <div className="">
                                    <div className='m-2'>
                                        Email:
                                        <input type='text' />
                                    </div>
                                    <div className='m-2'>
                                        Password:
                                        <input type='text' />
                                    </div>
                                    <button className='m-2 btn btn-primary'>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}