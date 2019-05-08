<?php
// Before removing this file, please verify the PHP ini setting `auto_prepend_file` does not point to this.

if (file_exists('/var/www/natachajay/kea/2-semester/07-cms/kalklandet/wordpress/wp-content/plugins/wordfence/waf/bootstrap.php')) {
	define("WFWAF_LOG_PATH", '/var/www/natachajay/kea/2-semester/07-cms/kalklandet/wordpress/wp-content/wflogs/');
	include_once '/var/www/natachajay/kea/2-semester/07-cms/kalklandet/wordpress/wp-content/plugins/wordfence/waf/bootstrap.php';
}
?>