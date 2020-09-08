
var searchModule = function() {
    var documents = [];
    var idMap = [];
    function a(a,b) { 
        documents.push(a);
        idMap.push(b); 
    }

    a(
        {
            id:0,
            title:"Test blog post docs",
            content:"NetlifyCMS",
            description:"blog post written NetlifyCMS",
            tags:'NetlifyCMS'
        },
        {
            url:'/posts/2018-02-11-test-blog-post-for-docs',
            title:"Test blog post for docs",
            description:"This blog post was written in NetlifyCMS"
        }
    );
    a(
        {
            id:1,
            title:"Secure Swagger ASP NET Core address port",
            content:"ASP NET Core",
            description:'',
            tags:'ASP.NET Core'
        },
        {
            url:'/posts/2020-09-08-secure-swagger-on-asp-net-core-by-address-and-port',
            title:"Secure Swagger on ASP.NET Core by address and port",
            description:""
        }
    );
    a(
        {
            id:2,
            title:"Job Interview Technical Test Preparation",
            content:"ASP NET Core",
            description:'',
            tags:'ASP.NET Core'
        },
        {
            url:'/posts/Job%20Interview%20Technical%20Test%20Preparation',
            title:"Job Interview Technical Test Preparation",
            description:""
        }
    );
    a(
        {
            id:3,
            title:"Resolving System NotSupportedException data available encoding net Core",
            content:"NET Core",
            description:'',
            tags:'.NET Core'
        },
        {
            url:'/posts/NotSupportedException%20exception%20using%20Encoding%20in%20.net%20core',
            title:"Resolving System.NotSupportedException No data is available for encoding 850 in .net Core",
            description:""
        }
    );
    a(
        {
            id:4,
            title:"Playing Service Workers",
            content:"Service Workers",
            description:'',
            tags:'Service Workers'
        },
        {
            url:'/posts/Playing-with-Service-Workers',
            title:"Playing with Service Workers",
            description:""
        }
    );
    a(
        {
            id:5,
            title:"Setting up Raspberry Pi NGINX PHP MySQL LEMP Stack",
            content:"Raspberry Pi",
            description:'',
            tags:'Raspberry Pi'
        },
        {
            url:'/posts/Setting-Raspberry-Pi-NGINX-PHP-MySQL-LEMP-Stack',
            title:"Setting up a Raspberry Pi NGINX PHP MySQL LEMP Stack",
            description:""
        }
    );
    a(
        {
            id:6,
            title:"Setting up NetlifyCMS Wyam Part",
            content:"Wyam",
            description:"Configuring simple single user mode NetlifyCMS Wyam",
            tags:'Wyam'
        },
        {
            url:'/posts/Setting-up-NetlifyCMS-with-Wyam---Part-1',
            title:"Setting up NetlifyCMS with Wyam - Part 1",
            description:"Configuring a simple single user mode NetlifyCMS with Wyam"
        }
    );
    a(
        {
            id:7,
            title:"Using Netlify Identity NetlifyCMS Wyam",
            content:"Wyam",
            description:"test lead",
            tags:'Wyam'
        },
        {
            url:'/posts/Setting-up-NetlifyCMS-with-Wyam---Part-4',
            title:"Using Netlify Identity with NetlifyCMS and Wyam",
            description:"test a lead"
        }
    );
    a(
        {
            id:8,
            title:"Secure ASP NET Core Health Checks specific port",
            content:"ASP NET Core",
            description:"Health Checks ASP NET Core give valuable insights health services includes sensitive data leaked externally",
            tags:'ASP.NET Core'
        },
        {
            url:'/posts/2020-09-08-Secure-ASP.NET-Core-Health-Checks-to-a-specific-port',
            title:"Secure ASP.NET Core Health Checks to a specific port",
            description:"Health Checks in ASP.NET Core can give valuable insights into the health of services, but that includes sensitive data that should not be leaked externally."
        }
    );
    a(
        {
            id:9,
            title:"fork cloned repository Visual Studio",
            content:"GitHub",
            description:'',
            tags:'GitHub'
        },
        {
            url:'/posts/Fork%20a%20cloned%20git%20repository',
            title:"How to fork a cloned repository in Visual Studio",
            description:""
        }
    );
    a(
        {
            id:10,
            title:"First Post",
            content:"Introduction",
            description:'',
            tags:'Introduction'
        },
        {
            url:'/posts/miniblog%20clone',
            title:"First Post",
            description:""
        }
    );
    a(
        {
            id:11,
            title:"NUnit Tests Showing Visual Studio Test Explorer",
            content:"NUnit",
            description:'',
            tags:'NUnit'
        },
        {
            url:'/posts/Nunit_Tests_Not_Showing_In_Test_Explorer',
            title:"NUnit 3 Tests Are Not Showing In Visual Studio Test Explorer",
            description:""
        }
    );
    a(
        {
            id:12,
            title:"Running ASP NET Core RaspberryPi Nginx",
            content:"ASP NET Core",
            description:'',
            tags:'ASP.NET Core'
        },
        {
            url:'/posts/Running%20ASP.NET%20Core%20on%20a%20RaspberryPi%202%20with%20Nginx',
            title:"Running ASP.NET Core on a RaspberryPi 2 with Nginx",
            description:""
        }
    );
    a(
        {
            id:13,
            title:"Using Netlify Identity NetlifyCMS Wyam",
            content:"Wyam",
            description:"test lead",
            tags:'Wyam'
        },
        {
            url:'/posts/Setting-up-NetlifyCMS-with-Wyam---Part%202',
            title:"Using Netlify Identity with NetlifyCMS and Wyam",
            description:"test a lead"
        }
    );
    a(
        {
            id:14,
            title:"Setting up NetlifyCMS Wyam Part",
            content:"Wyam",
            description:"Configuring simple single user mode NetlifyCMS Wyam",
            tags:'Wyam'
        },
        {
            url:'/posts/Setting-up-NetlifyCMS-with-Wyam---Part-3',
            title:"Setting up NetlifyCMS with Wyam - Part 3",
            description:"Configuring a simple single user mode NetlifyCMS with Wyam"
        }
    );
    a(
        {
            id:15,
            title:"VSTO installs over HTTPS issues",
            content:"VSTO",
            description:'',
            tags:'VSTO'
        },
        {
            url:'/posts/VSTO-installs-over-HTTPS-issues',
            title:"VSTO installs over HTTPS issues",
            description:""
        }
    );
    var idx = lunr(function() {
        this.field('title');
        this.field('content');
        this.field('description');
        this.field('tags');
        this.ref('id');

        this.pipeline.remove(lunr.stopWordFilter);
        this.pipeline.remove(lunr.stemmer);
        documents.forEach(function (doc) { this.add(doc) }, this)
    });

    return {
        search: function(q) {
            return idx.search(q).map(function(i) {
                return idMap[i.ref];
            });
        }
    };
}();
