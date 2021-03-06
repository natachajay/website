<?php if ( post_password_required() )
	return;
?>

	<?php if ( have_comments() ) : ?>
	
		<a name="comments"></a>
	
		<div class="comments section bg-grey">
			
			<div class="comments-inner section-inner thin">
			
				<div class="comments-title-container">
				
					<h2 class="comments-title fleft">
					
						<?php 
						$comment_count = count( $wp_query->comments_by_type['comment'] );
						printf( _n( '%s Comment', '%s Comments', $comment_count, 'radcliffe' ), $comment_count ); ?>
						
					</h2>
					
					<h4 class="add-comment-title fright"><a href="#respond"><?php _e( 'Add yours', 'radcliffe' ); ?> &rarr;</a></h4>
					
					<div class="clear"></div>
				
				</div><!-- .comments-title-container -->
				
				<div class="clear"></div>
		
				<ol class="commentlist">
				    <?php wp_list_comments( array( 'type' => 'comment', 'callback' => 'radcliffe_comment' ) ); ?>
				</ol>
				
				<?php if ( ! empty( $comments_by_type['pings'] ) ) : ?>
				
					<div class="pingbacks">
					
						<div class="pingbacks-inner">
					
							<h3 class="pingbacks-title">

								<?php 
								$pingback_count = count( $wp_query->comments_by_type['pings'] );
								printf( _n( '%s Pingback', '%s Pingbacks', $pingback_count, 'radcliffe' ), $pingback_count ); ?>
							
							</h3>
						
							<ol class="pingbacklist">
							    <?php wp_list_comments( array( 'type' => 'pings', 'callback' => 'radcliffe_comment' ) ); ?>
							</ol>
							
						</div>
						
					</div>
				
				<?php endif; ?>
					
				<?php if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) : ?>
				
					<div class="comments-nav-below" role="navigation">
					
						<div class="fleft">
											
							<?php previous_comments_link( '&laquo; ' . __( 'Older Comments', 'radcliffe' ) ); ?>
						
						</div>
						
						<div class="fright">
						
							<?php next_comments_link( __( 'Newer Comments', 'radcliffe' ) . ' &raquo;' ); ?>
						
						</div>
						
						<div class="clear"></div>
						
					</div><!-- .comment-nav-below -->
					
				<?php endif; ?>
			
			</div><!-- .comments-inner -->
			
		</div><!-- .comments -->
		
	<?php endif; ?>
	
	<?php if ( ! comments_open() && ! is_page() ) : ?>
	
		<p class="nocomments section bg-grey"><?php _e( 'Comments are closed.', 'radcliffe' ); ?></p>
		
	<?php elseif ( comments_open() ) : ?>
	
		<div class="respond section bg-grey">
		
			<a name="respond"></a>
		
			<div class="section-inner thin">
	
				<?php comment_form( ); ?>
		
			</div>
			
		</div>
	
	<?php endif; ?>