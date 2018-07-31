
var searchModule = function() {
    var idMap = [];
    function y(e) { 
        idMap.push(e); 
    }
    var idx = lunr(function() {
        this.field('title', { boost: 10 });
        this.field('content');
        this.field('description', { boost: 5 });
        this.field('tags', { boost: 50 });
        this.ref('id');

        this.pipeline.remove(lunr.stopWordFilter);
        this.pipeline.remove(lunr.stemmer);
    });
    function a(e) { 
        idx.add(e); 
    }

    a({
        id:0,
        title:"Job Interview Technical Test Preparation",
        content:"ASP NET Core",
        description:'',
        tags:'ASP.NET Core'
    });

    a({
        id:1,
        title:"NUnit Tests Showing Visual Studio Test Explorer",
        content:"NUnit",
        description:'',
        tags:'NUnit'
    });

    a({
        id:2,
        title:"Playing Service Workers",
        content:"Service Workers",
        description:'',
        tags:'Service Workers'
    });

    a({
        id:3,
        title:"Setting up Raspberry Pi NGINX PHP MySQL LEMP Stack",
        content:"Raspberry Pi",
        description:'',
        tags:'Raspberry Pi'
    });

    a({
        id:4,
        title:"Setting up NetlifyCMS Wyam Part",
        content:"Wyam",
        description:"Configuring simple single user mode NetlifyCMS Wyam",
        tags:'Wyam'
    });

    a({
        id:5,
        title:"Using Netlify Identity NetlifyCMS Wyam",
        content:"Wyam",
        description:"test lead",
        tags:'Wyam'
    });

    a({
        id:6,
        title:"fork cloned repository Visual Studio",
        content:"GitHub",
        description:'',
        tags:'GitHub'
    });

    a({
        id:7,
        title:"First Post",
        content:"Introduction",
        description:'',
        tags:'Introduction'
    });

    a({
        id:8,
        title:"Resolving System NotSupportedException data available encoding net Core",
        content:"NET Core",
        description:'',
        tags:'.NET Core'
    });

    a({
        id:9,
        title:"Running ASP NET Core RaspberryPi Nginx",
        content:"ASP NET Core",
        description:'',
        tags:'ASP.NET Core'
    });

    a({
        id:10,
        title:"Using Netlify Identity NetlifyCMS Wyam",
        content:"Wyam",
        description:"test lead",
        tags:'Wyam'
    });

    a({
        id:11,
        title:"Setting up NetlifyCMS Wyam Part",
        content:"Wyam",
        description:"Configuring simple single user mode NetlifyCMS Wyam",
        tags:'Wyam'
    });

    a({
        id:12,
        title:"Test blog post docs",
        content:"NetlifyCMS",
        description:"blog post written NetlifyCMS",
        tags:'NetlifyCMS'
    });

    y({
        url:'/posts/Job%20Interview%20Technical%20Test%20Preparation',
        title:"Job Interview Technical Test Preparation",
        description:""
    });

    y({
        url:'/posts/Nunit_Tests_Not_Showing_In_Test_Explorer',
        title:"NUnit 3 Tests Are Not Showing In Visual Studio Test Explorer",
        description:""
    });

    y({
        url:'/posts/Playing-with-Service-Workers',
        title:"Playing with Service Workers",
        description:""
    });

    y({
        url:'/posts/Setting-Raspberry-Pi-NGINX-PHP-MySQL-LEMP-Stack',
        title:"Setting up a Raspberry Pi NGINX PHP MySQL LEMP Stack",
        description:""
    });

    y({
        url:'/posts/Setting-up-NetlifyCMS-with-Wyam---Part-1',
        title:"Setting up NetlifyCMS with Wyam - Part 1",
        description:"Configuring a simple single user mode NetlifyCMS with Wyam"
    });

    y({
        url:'/posts/Setting-up-NetlifyCMS-with-Wyam---Part-4',
        title:"Using Netlify Identity with NetlifyCMS and Wyam",
        description:"test a lead"
    });

    y({
        url:'/posts/Fork%20a%20cloned%20git%20repository',
        title:"How to fork a cloned repository in Visual Studio",
        description:""
    });

    y({
        url:'/posts/miniblog%20clone',
        title:"First Post",
        description:""
    });

    y({
        url:'/posts/NotSupportedException%20exception%20using%20Encoding%20in%20.net%20core',
        title:"Resolving System.NotSupportedException No data is available for encoding 850 in .net Core",
        description:""
    });

    y({
        url:'/posts/Running%20ASP.NET%20Core%20on%20a%20RaspberryPi%202%20with%20Nginx',
        title:"Running ASP.NET Core on a RaspberryPi 2 with Nginx",
        description:""
    });

    y({
        url:'/posts/Setting-up-NetlifyCMS-with-Wyam---Part%202',
        title:"Using Netlify Identity with NetlifyCMS and Wyam",
        description:"test a lead"
    });

    y({
        url:'/posts/Setting-up-NetlifyCMS-with-Wyam---Part-3',
        title:"Setting up NetlifyCMS with Wyam - Part 3",
        description:"Configuring a simple single user mode NetlifyCMS with Wyam"
    });

    y({
        url:'/posts/2018-02-11-test-blog-post-for-docs',
        title:"Test blog post for docs",
        description:"This blog post was written in NetlifyCMS"
    });

    return {
        search: function(q) {
            return idx.search(q).map(function(i) {
                return idMap[i.ref];
            });
        }
    };
}();
