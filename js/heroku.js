'use strict';

const heroku_api_url = 'https://api.heroku.com/';

// Load Heroku account information
const update_heroku_account_info = (api_key, div_id) => {
    if (api_key) {
        let options = {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + api_key,
              'Accept': 'application/vnd.heroku+json; version=3'
            }
        };

        // Call Heroku API to get account info
        fetch(heroku_api_url + 'account', options).then(function(response) {
          return response.json();
        }).then(function(data) {
            // Construct HTML for account DIV in 'Heroku' tab
            let account_html_block = '';
                
            account_html_block += '<div class="row">';
            account_html_block += '<div class="col-sm-4">ID</div><div class="col-sm-8">' + data['id'] + '</div>';
            account_html_block += '<div class="col-sm-4">Name</div><div class="col-sm-8">' + data['name'] + '</div>';
            account_html_block += '<div class="col-sm-4">Email</div><div class="col-sm-8">' + data['email'] + '</div>';
            account_html_block += '<div class="col-sm-4">Sms number</div><div class="col-sm-8">' + data['sms_number'] + '</div>';
            account_html_block += '<div class="col-sm-4">Identity Provider</div><div class="col-sm-8">' + data['identity_provider'] + '</div>';
            account_html_block += '<div class="col-sm-4">Created at</div><div class="col-sm-8">' + $.format.date(data['created_at'], "yyyy-MM-dd HH:mm:ss") + '</div>';
            account_html_block += '<div class="col-sm-4">Updated at</div><div class="col-sm-8">' + $.format.date(data['updated_at'], "yyyy-MM-dd HH:mm:ss") + '</div>';
   		    account_html_block += '<div class="col-sm-4">Last login</div><div class="col-sm-8">' + $.format.date(data['last_login'], "yyyy-MM-dd HH:mm:ss") + '</div>';
            account_html_block += '</div>';
                
            // Update account UI
            $("#" + div_id).html(account_html_block);
            // Update status bar
            updateStatus('Loaded account info.');
        }).catch(function(err) {
            let html = '<span style="color:red;">Error: ' + err + '</span>';
            updateStatus(html);
        });        
    }else{
        let html = '<span style="color:red;">Invalid API key.</span>';
        updateStatus(html);
    }
}

// Load Heroku invoices information
const update_heroku_invoices_info = (api_key, div_id) => {
    if (api_key) {
        let options = {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + api_key,
              'Accept': 'application/vnd.heroku+json; version=3'
            }
        };

        // Call Heroku API to retrieve invoices info
        fetch(heroku_api_url + 'account/invoices', options).then(function(response) {
          return response.json();
        }).then(function(data) {
            let invoices_html_block = '';
            
            // For each invoice, contruct an HTML div block
            for(let i in data)  {          
                invoices_html_block += '<div class="row">';
                invoices_html_block += '<div class="col-sm-4">ID</div><div class="col-sm-8">' + data[i]['id'] + '</div>';
                invoices_html_block += '<div class="col-sm-4">Number</div><div class="col-sm-8">' + data[i]['number'] + '</div>';
                invoices_html_block += '<div class="col-sm-4">Charges total</div><div class="col-sm-8">' + data['charges_total'] + '</div>';
                invoices_html_block += '<div class="col-sm-4">Credits total</div><div class="col-sm-8">' + data['credits_total'] + '</div>';
                invoices_html_block += '<div class="col-sm-4">Total</div><div class="col-sm-8">' + data['total'] + '</div>';
                invoices_html_block += '<div class="col-sm-4">Created at</div><div class="col-sm-8">' + $.format.date(data['created_at'], "yyyy-MM-dd HH:mm:ss") + '</div>';
                invoices_html_block += '<div class="col-sm-4">Updated at</div><div class="col-sm-8">' + $.format.date(data['updated_at'], "yyyy-MM-dd HH:mm:ss") + '</div>';
   		        invoices_html_block += '<div class="col-sm-4">Period start</div><div class="col-sm-8">' + data['period_start'] + '</div>';
                invoices_html_block += '<div class="col-sm-4">Period end</div><div class="col-sm-8">' + data['period_end'] + '</div>';
                invoices_html_block += '</div>';
            }
                
            // Update invoices UI
            $("#" + div_id).html(invoices_html_block);
            // Update status bar
            updateStatus('Loaded invoices info.');
        }).catch(function(err) {
            let html = '<span style="color:red;">Error: ' + err + '</span>';
            updateStatus(html);
        });        
    }else{
        let html = '<span style="color:red;">Invalid API key.</span>';
        updateStatus(html);
    }
}

// Load Heroku credits information
const update_heroku_credits_info = (api_key, div_id) => {
    if (api_key) {
        let options = {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + api_key,
              'Accept': 'application/vnd.heroku+json; version=3'
            }
        };
        // Call Heroku API to get credits info
        fetch(heroku_api_url + 'account/credits', options).then(function(response) {
          return response.json();
        }).then(function(data) {
            let credits_html_block = '';

            // Construct HTML DIVs for credits
            for(let i in data)  {          
                credits_html_block += '<div class="row">';
                credits_html_block += '<div class="col-sm-4">Title</div><div class="col-sm-8">' + data[i]['title'] + '</div>';
                credits_html_block += '<div class="col-sm-4">ID</div><div class="col-sm-8">' + data[i]['id'] + '</div>';
                credits_html_block += '<div class="col-sm-4">Amount</div><div class="col-sm-8">' + data['amount'] + '</div>';
                credits_html_block += '<div class="col-sm-4">Balance total</div><div class="col-sm-8">' + data['balance'] + '</div>';
                credits_html_block += '<div class="col-sm-4">Created at</div><div class="col-sm-8">' + data['created_at'] + '</div>';
                credits_html_block += '<div class="col-sm-4">Updated at</div><div class="col-sm-8">' + $.format.date(data['updated_at'], "yyyy-MM-dd HH:mm:ss") + '</div>';
   		        credits_html_block += '<div class="col-sm-4">Expired at</div><div class="col-sm-8">' + $.format.date(data['expires_at'], "yyyy-MM-dd HH:mm:ss") + '</div>';
                credits_html_block += '</div>';
            }
                
            // Update credits UI
            $("#" + div_id).html(credits_html_block);
            // Update status bar
            updateStatus('Loaded credits info.');
        }).catch(function(err) {
            let html = '<span style="color:red;">Error: ' + err + '</span>';
            updateStatus(html);
        });        
    }else{
        let html = '<span style="color:red;">Invalid API key.</span>';
        updateStatus(html);
    }
}


// Update UI with apps and dynos info
const update_heroku_apps_info = (api_key, apps_div_id, dynos_div_id, domains_div_id) => {
    if (api_key) {
        // HTTP request headers
        let options = {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + api_key,
              'Accept': 'application/vnd.heroku+json; version=3'
            }
        };

        // Load Heroku application information
        fetch(heroku_api_url + 'apps', options).then(function(response) {
          return response.json();
        }).then(function(data) {
            let apps_html_block = '';
            let app_ids = [];   // app_ids array is used to make the second round API calls to get dynos, domains info 
            
            // For each application, construct HTML under applications section in 'Heroku' tab, also, keep app_ids in the array
            for(let s in data) {  
                apps_html_block += '<div class="row divblock">';
                
                app_ids.push(data[s]['id']);                
                apps_html_block += '<div class="col-sm-4">Name</div><div class="col-sm-8">' + data[s]['name'] + '</div>';
                apps_html_block += '<div class="col-sm-4">Buildpack</div><div class="col-sm-8">' + data[s]['buildpack_provided_description'] + '</div>';
                apps_html_block += '<div class="col-sm-4">Repo size</div><div class="col-sm-8">' + data[s]['repo_size'] + '</div>';
                apps_html_block += '<div class="col-sm-4">Slug size</div><div class="col-sm-8">' + data[s]['slug_size'] + '</div>';
                apps_html_block += '<div class="col-sm-4">Created at</div><div class="col-sm-8">' + $.format.date(data[s]['created_at'], "yyyy-MM-dd HH:mm:ss") + '</div>';
                apps_html_block += '<div class="col-sm-4">Released at</div><div class="col-sm-8">' + $.format.date(data[s]['released_at'], "yyyy-MM-dd HH:mm:ss") + '</div>';
                apps_html_block += '<div class="col-sm-4">Updated at</div><div class="col-sm-8">' + $.format.date(data[s]['updated_at'], "yyyy-MM-dd HH:mm:ss") + '</div>';
                apps_html_block += '<div class="col-sm-4">Region</div><div class="col-sm-8">' + data[s]['region']['name'] + '</div>';
                apps_html_block += '<div class="col-sm-4">Git url</div><div class="col-sm-8">' + data[s]['git_url'] + '</div>';
                apps_html_block += '<div class="col-sm-4">Url</div><div class="col-sm-8"><a target="_blank" href="' + data[s]['web_url'] + '">' + data[s]['web_url'] + '</a></div>';
   		        apps_html_block += '</div>';
            }    
            // Update account UI
            $("#" + apps_div_id).html(apps_html_block);
            // Update status bar
            updateStatus('Loaded apps info.');
            return app_ids;
        }).then(function(app_ids) {  // pass app_ids to make the second API call to retrieve dynos info
            update_heroku_dynos_info(api_key, options, app_ids, dynos_div_id);
            return app_ids;
        }).then(function(app_ids) {  // pass app_ids to make the third API call to retrieve domains info
            update_heroku_domains_info(api_key, options, app_ids, domains_div_id);
            return app_ids;
        }).catch(function(err) {
            let html = '<span style="color:red;">Error: ' + err + '</span>';
            updateStatus(html);
        });        
    }else{
        let html = '<span style="color:red;">Invalid API key.</span>';
        updateStatus(html);
    }
}

// Update Heroku dynos info
const update_heroku_dynos_info = (api_key, options, app_ids, dynos_div_id) => {
    $("#" + dynos_div_id).html('');
    for(let i in app_ids){
    // Load Heroku dynos information
        fetch(heroku_api_url + 'apps/' + app_ids[i] + '/dynos', options).then(function(response) {
            return response.json();
        }).then(function(dynos_data) {  
            let html_block = '';
            // construct HTML for dynos
            for(let s in dynos_data) {
                html_block += '<div class="row divblock">';
                html_block += '<div class="col-sm-4">Name</div><div class="col-sm-8">' + dynos_data[s]['name'] + '</div>';
                html_block += '<div class="col-sm-4">ID</div><div class="col-sm-8">' + dynos_data[s]['id'] + '</div>';
                html_block += '<div class="col-sm-4">Type</div><div class="col-sm-8">' + dynos_data[s]['type'] + '</div>';
                html_block += '<div class="col-sm-4">Size</div><div class="col-sm-8">' + dynos_data[s]['size'] + '</div>';
                html_block += '<div class="col-sm-4">State</div><div class="col-sm-8">' + dynos_data[s]['state'] + '</div>';
                html_block += '<div class="col-sm-4">Created at</div><div class="col-sm-8">' + $.format.date(dynos_data[s]['created_at'], "yyyy-MM-dd HH:mm:ss") + '</div>';
                html_block += '<div class="col-sm-4">Updated at</div><div class="col-sm-8">' + $.format.date(dynos_data[s]['updated_at'], "yyyy-MM-dd HH:mm:ss") + '</div>';
                html_block += '<div class="col-sm-4">App name</div><div class="col-sm-8">' + dynos_data[s]['app']['name'] + '</div>';
                html_block += '</div>';
            }
            $("#" + dynos_div_id).html($("#" + dynos_div_id).html()+html_block);
            updateStatus('Loaded dyno info.');             
        }).catch(function(err) {
            let html = '<span style="color:red;">Error: ' + err + '</span>';
            updateStatus(html);
        });
    }
}

// Update Heroku domains info
const update_heroku_domains_info = (api_key, options, app_ids, domains_div_id) => {
    $("#" + domains_div_id).html('');
    for(let i in app_ids){
        // Load Heroku domains information
        fetch(heroku_api_url + 'apps/' + app_ids[i] + '/domains', options).then(function(response) {
            return response.json();
        }).then(function(domains_data) {
            let html_block = '';
            // generate HTML for domains
            for(let s in domains_data) {
                html_block += '<div class="row divblock">';
                html_block += '<div class="col-sm-4">Hostname</div><div class="col-sm-8">' + domains_data[s]['hostname'] + '</div>';
                html_block += '<div class="col-sm-4">Status</div><div class="col-sm-8">' + domains_data[s]['status'] + '</div>';
                html_block += '<div class="col-sm-4">ID</div><div class="col-sm-8">' + domains_data[s]['id'] + '</div>';
                html_block += '<div class="col-sm-4">Created at</div><div class="col-sm-8">' + $.format.date(domains_data[s]['created_at'], "yyyy-MM-dd HH:mm:ss") + '</div>';
                html_block += '<div class="col-sm-4">CNAME</div><div class="col-sm-8">' + domains_data[s]['cname'] + '</div>';
                html_block += '<div class="col-sm-4">App name</div><div class="col-sm-8">' + domains_data[s]['app']['name'] + '</div>';
                html_block += '</div>';
            }
            $("#" + domains_div_id).html($("#" + domains_div_id).html()+html_block);
            updateStatus('Loaded domain info.');             
        }).catch(function(err) {
            let html = '<span style="color:red;">Error: ' + err + '</span>';
            updateStatus(html);
        });
    }
}