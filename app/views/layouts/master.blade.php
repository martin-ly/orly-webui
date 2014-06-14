<!DOCTYPE html>
<html>
    <head>
        <title>
            @section('title')
            OrlyAtomics
            @show
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- CSS are placed here -->
        {{ HTML::style('css/bootstrap.css') }}
        {{ HTML::style('css/graph.css') }}
    </head>
    <body>
     <!-- Static navbar -->
      <div class="navbar navbar-default" role="navigation">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="/console">Orly Demo</a>
          </div>
          <div class="navbar-collapse collapse">
            <!-- TODO: Make active highlight appropriately -->
            <ul class="nav navbar-nav">
              <li><a href="/">Home</a></li>
              <li><a href="/console">Console</a></li>
            </ul>
          </div><!--/.nav-collapse -->
        </div><!--/.container-fluid -->
      </div>
        <!-- Container -->
        <div class="container">
            <!-- Content -->
            @yield('content')
        </div>
        <!-- Scripts are placed here -->
        @section('script')
        {{ HTML::script('js/require.min.js') }}
        {{ HTML::script('js/main.js') }}
        @show
    </body>
</html>
