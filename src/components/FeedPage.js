import React from 'react';
import StoryComponent from './StoryComponent';
import PostInput from './PostInput';
import Timeline1 from './Timeline1';
import Navbar from './Navbar';
//import PostList from './PostList'; // If you have a PostList component

const FeedPage = () => {
    return (
        <div class="_layout _layout_main_wrapper">

			<div class="_main_layout">

				<nav class="navbar navbar-expand-lg navbar-light _header_nav _padd_t10">
					<Navbar/>
				</nav>
			
				<div class="container _custom_container">
					<div class="_layout_inner_wrap">
						<div class="row">
							
							
							<div class="col-xl-3 col-lg-3 col-md-12 col-sm-12">
								{/* <!-- Left Sidebar --> */}
							</div>


							<div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">
								<div class="_layout_middle_wrap">
									<div class="_layout_middle_inner">

										<div class="_feed_inner_ppl_card _mar_b16">
											<StoryComponent />
										</div>
										
						
										<div class="_feed_inner_text_area  _b_radious6 _padd_b24 _padd_t24 _padd_r24 _padd_l24 _mar_b16">			
											<PostInput />
										</div>

										<div class="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16" style={{backgroundColor:'#f2f4f7', borderRadius:'30px'}}>
											<Timeline1/>
										</div>

										

									</div>
								</div>
							</div>


							<div class="col-xl-3 col-lg-3 col-md-12 col-sm-12">
								{/* <!-- Right Sidebar --> */}
							</div>
							

						</div>
					</div>
				</div>

			</div>



		</div>
    );
};

export default FeedPage;
